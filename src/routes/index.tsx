import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ApparelStore, COUNTRIES } from "../lib/apparel";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StoresList from "../components/StoresList";
import Footer from "../components/Footer";


export const useGetStores = routeLoader$(async (requestEvent) => {
  try {
    const db = requestEvent.platform.env?.DB;
    if (!db) {
      console.warn("Database not available in routeLoader");
      return [];
    }

    const { results } = await db
      .prepare("SELECT * FROM apparel_stores ORDER BY name ASC")
      .all();

    const stores: ApparelStore[] = (results as any[]).map((row) => {
      let socials: Array<{ platform: string; url: string }> = [];
      if (row.social_links) {
        try {
          const links = JSON.parse(row.social_links);
          if (Array.isArray(links)) {
            socials = links
              .filter((link: any) => link.platform && link.url)
              .map((link: any) => ({
                platform: link.platform,
                url: link.url,
              }));
          }
        } catch (e) {
          console.warn("Invalid social_links JSON for store", row.id, e);
        }
      }

      return {
        id: row.id,
        name: row.name,
        country: row.country,
        countryCode: row.countryCode,
        isEU: row.isEU === 1,
        tags: row.tags.split(",").map((t: string) => t.trim()),
        url: row.url,
        description: row.description,
        socials: socials.length > 0 ? socials : undefined,
        nsfw: row.nsfw === 1,
        logoUrl: row.logo_url,
        foundedYear: row.founded_year,
      };
    });

    return stores;
  } catch (error) {
    console.warn("Error fetching stores from database:", error);
    return [];
  }
});


export default component$(() => {
  const searchQuery = useSignal("");
  const selectedCountry = useSignal("");
  const showEUOnly = useSignal(true);
  const filteredStores = useSignal<ApparelStore[]>([]);
  const storesLoader = useGetStores();
  const isInitialized = useSignal(false);
  const suggestionsOpen = useSignal(false);
  const showNSFW = useSignal(true);

  useTask$(() => {
    if (
      !isInitialized.value &&
      storesLoader.value &&
      storesLoader.value.length > 0
    ) {
      isInitialized.value = true;
      filteredStores.value = storesLoader.value;
    }
  });

  const updateFilteredStores = $(() => {
    const storeData = storesLoader.value ?? [];
    const q = searchQuery.value.trim().toLowerCase();

    filteredStores.value = storeData.filter((store) => {
      const matchesSearch =
        q === "" ||
        store.name.toLowerCase().includes(q) ||
        store.description.toLowerCase().includes(q) ||
        store.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesCountry =
        selectedCountry.value === "" ||
        store.countryCode === selectedCountry.value;

      const matchesEU = !showEUOnly.value || store.isEU;

      return matchesSearch && matchesCountry && matchesEU;
    });
  });


  return (
    <>
      <div class="min-h-screen bg-white text-black transition-colors dark:bg-black dark:text-white">
        <Header />

        <div class="flex flex-col lg:flex-row">
          <Sidebar
            searchQuery={searchQuery}
            selectedCountry={selectedCountry}
            showEUOnly={showEUOnly}
            showNSFW={showNSFW}
            updateFilteredStores={updateFilteredStores}
            suggestionsOpen={suggestionsOpen}
          />

          <div class="flex-1 p-6">
            {/* Results Header */}
            <div class="mb-6 border-b-2 border-black dark:border-white flex flex-row gap-4">
              <h2 class="font-mono text-lg font-bold">RESULTS: {filteredStores.value.length} STORES</h2>

              {selectedCountry.value && (
                <p class="font-mono text-sm opacity-70 mt-auto pb-1">Filtering: {COUNTRIES.find((c) => c.code === selectedCountry.value)?.name}</p>
              )}

              {selectedCountry.value && showEUOnly.value && <p class="font-mono text-sm opacity-70 mt-auto pb-1">|</p>}
              {showEUOnly.value && <p class="font-mono text-sm opacity-70 mt-auto pb-1">EU members only</p>}
            </div>

            <StoresList filteredStores={filteredStores.value} showNSFW={showNSFW.value} />

            <Footer storesLoader={storesLoader} />
          </div>
        </div>
      </div>
    </>
  );
});


export const head: DocumentHead = {
  title: "Furry Apparel Index",
  meta: [
    {
      name: "description",
      content: "Global Furry Apparel Index",
    },
  ],
};
