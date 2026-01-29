import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

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

    // Transform database results to match ApparelStore interface
    const stores: ApparelStore[] = (results as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      country: row.country,
      countryCode: row.countryCode,
      isEU: row.isEU === 1,
      category: row.category,
      url: row.url,
      description: row.description,
      ...(row.socialPlatform && row.socialUrl
        ? {
          social: {
            platform: row.socialPlatform,
            url: row.socialUrl,
          },
        }
        : {}),
    }));

    return stores;
  } catch (error) {
    console.warn("Error fetching stores from database:", error);
    return [];
  }
});

interface ApparelStore {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  isEU: boolean;
  category: string;
  url: string;
  social?: {
    platform: string;
    url: string;
  };
  description: string;
}


const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "AU", name: "Australia" },
  { code: "GB", name: "United Kingdom" },
  { code: "FI", name: "Finland" },
  { code: "DE", name: "Germany" },
  { code: "EU", name: "Other EU" },
];


const CATEGORIES = ["All", "Apparel", "Premium", "Design"];


export default component$(() => {
  const searchQuery = useSignal("");
  const selectedCountry = useSignal("");
  const selectedCategory = useSignal("All");
  const showEUOnly = useSignal(false);
  const filteredStores = useSignal<ApparelStore[]>([]);
  const storesLoader = useGetStores();
  const isInitialized = useSignal(false);
  const suggestionsOpen = useSignal(false);



  useTask$(() => {
    if (!isInitialized.value && storesLoader.value && storesLoader.value.length > 0) {
      isInitialized.value = true;
      filteredStores.value = storesLoader.value;
    }
  });



  const updateFilteredStores = $(() => {
    const storeData = storesLoader.value;
    filteredStores.value = storeData.filter((store) => {
      const matchesSearch =
        searchQuery.value === "" ||
        store.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        store.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());


      const matchesCountry =
        selectedCountry.value === "" ||
        store.countryCode === selectedCountry.value;


      const matchesCategory =
        selectedCategory.value === "All" ||
        store.category === selectedCategory.value;


      const matchesEU = !showEUOnly.value || store.isEU;


      return matchesSearch && matchesCountry && matchesCategory && matchesEU;
    });
  });


  return (
    <>
      <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
        {/* Header */}
        <div class="border-b-2 border-black dark:border-white p-4">
          <h1 class="text-2xl font-bold font-mono mb-2">FURRY APPAREL INDEX</h1>
          <p class="text-sm font-mono opacity-80">
            A curated index of furry apparel stores worldwide.
          </p>
        </div>


        {/* Main Content */}
        <div class="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div class="w-full lg:w-80 border-r-2 border-black dark:border-white p-6 space-y-6">
            {/* Search Box */}
            <div class="space-y-2">
              <label class="block text-sm font-mono font-bold">
                $ SEARCH STORES
              </label>
              <input
                type="text"
                placeholder="name or description..."
                value={searchQuery.value}
                onInput$={(e: any) => {
                  searchQuery.value = e.target.value;
                  updateFilteredStores();
                }}
                class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-sm focus:outline-none focus:invert dark:focus:invert"
              />
            </div>


            {/* Category Filter */}
            <div class="space-y-2">
              <label class="block text-sm font-mono font-bold">
                $ CATEGORY (⚠️ WIP)
              </label>
              <select
                value={selectedCategory.value}
                onChange$={(e: any) => {
                  selectedCategory.value = e.target.value;
                  updateFilteredStores();
                }}
                class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-sm focus:outline-none focus:invert dark:focus:invert cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>


            {/* Country Filter */}
            <div class="space-y-2">
              <label class="block text-sm font-mono font-bold">
                $ COUNTRY/REGION
              </label>
              <select
                value={selectedCountry.value}
                onChange$={(e: any) => {
                  selectedCountry.value = e.target.value;
                  updateFilteredStores();
                }}
                class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-sm focus:outline-none focus:invert dark:focus:invert cursor-pointer"
              >
                <option value="">-- All Regions --</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>


            {/* EU Filter */}
            <div class="space-y-2">
              <label class="flex items-center gap-2 font-mono text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEUOnly.value}
                  onChange$={(e: any) => {
                    showEUOnly.value = e.target.checked;
                    updateFilteredStores();
                  }}
                  class="w-4 h-4 border-2 border-black dark:border-white cursor-pointer"
                />
                <span class="font-bold">EU ONLY</span>
              </label>
              <p class="text-xs font-mono opacity-70">
                Filter stores from EU members
              </p>
            </div>


            {/* Divider */}
            <div class="border-t-2 border-black dark:border-white"></div>


            {/* TO-DO: Suggestion Form */}
            {/* Make it submit to the discord bot for manual approval */}
            <div class="space-y-2">
              <button
                onClick$={() =>
                  (suggestionsOpen.value = !suggestionsOpen.value)
                }
                class="w-full p-2 border-2 border-black bg-white dark:bg-black dark:border-white font-mono text-sm font-bold hover:invert dark:hover:invert transition-colors"
              >
                {suggestionsOpen.value ? "[-] SUGGEST STORE" : "[+] SUGGEST STORE"}
              </button>


              {suggestionsOpen.value && (
                <div class="disabled">
                  <div class="space-y-2 p-3 border-2 border-black dark:border-white bg-white dark:bg-black">
                    <input
                      type="text"
                      placeholder="Store name"
                      class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-xs focus:outline-none focus:invert dark:focus:invert"
                    />
                    <input
                      type="text"
                      placeholder="Store URL"
                      class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-xs focus:outline-none focus:invert dark:focus:invert"
                    />
                    <input
                      type="text"
                      placeholder="Social Media link (optional)"
                      class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-xs focus:outline-none focus:invert dark:focus:invert"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-xs focus:outline-none focus:invert dark:focus:invert"
                    />
                    <textarea
                      placeholder="Why should it be added?"
                      rows={3}
                      class="w-full p-2 border-2 border-black dark:border-white dark:bg-black bg-white font-mono text-xs focus:outline-none focus:invert dark:focus:invert resize-none"
                    ></textarea>
                    {/* text area saying form is still wip */}
                    <p class="text-xs font-mono opacity-70 mt-2">
                      This form is still a work in progress. And does not allow for submissions yet.
                    </p>
                    <button disabled class='cursor-not-allowed w-full p-2 bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold
                    opacity-50
                    '>
                      {/* hover:opacity-80 transition-opacity  */}
                      SUBMIT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Content Area */}
          <div class="flex-1 p-6">
            {/* Results Header */}
            <div class="mb-6 pb-4 border-b-2 border-black dark:border-white">
              <h2 class="text-lg font-mono font-bold">
                RESULTS: {filteredStores.value.length} STORES
              </h2>
              {selectedCountry.value && (
                <p class="text-sm font-mono opacity-70 mt-2">
                  Filtering: {COUNTRIES.find((c) => c.code === selectedCountry.value)?.name}
                </p>
              )}
              {showEUOnly.value && (
                <p class="text-sm font-mono opacity-70">
                  EU members only
                </p>
              )}
            </div>


            {/* Stores List */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredStores.value.length > 0 ? (
                filteredStores.value.map((store) => (
                  <div
                    key={store.id}
                    class="border-2 border-black dark:border-white p-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 class="text-lg font-mono font-bold">{store.name}</h3>
                        <p class="text-sm font-mono">
                          {store.country} ({store.countryCode})
                        </p>
                      </div>
                      <div class="flex gap-2 flex-wrap">
                        <span class="text-xs font-mono font-bold px-2 py-1 border-2 border-current">
                          {store.category}
                        </span>
                        {store.isEU && (
                          <span class="text-xs font-mono font-bold px-2 py-1 border-2 border-current">
                            EU
                          </span>
                        )}
                      </div>
                    </div>


                    <p class="text-sm font-mono mb-3 opacity-80">
                      {store.description}
                    </p>


                    <div class="flex gap-2 flex-wrap">
                      <a
                        href={store.url}
                        target="_blank"
                        class="inline-block text-xs font-mono font-bold border-2 border-current px-3 py-1 active:invert dark:active:invert transition-colors"
                      >
                        VISIT →
                      </a>
                      {store.social && (
                        <a
                          href={store.social.url}
                          target="_blank"
                          class="inline-block text-xs font-mono font-bold border-2 border-current px-3 py-1 active:invert dark:active:invert transition-colors"
                        >
                          {store.social.platform}
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div class="p-6 border-2 border-black dark:border-white text-center">
                  <p class="font-mono text-sm opacity-70">
                    NO STORES FOUND. TRY ADJUSTING YOUR FILTERS.
                  </p>
                </div>
              )}
            </div>


            {/* Footer */}
            <div class="mt-12 pt-6 border-t-2 border-black dark:border-white opacity-60">
              <p class="text-xs font-mono">
                $ furry-apparel-index v1.0 |
                Maintained by <a href="https://bsky.app/profile/did:plc:aakmgpxyqmyzdq27ilyqirev" target="_blank" class="underline">SUDO</a>
              </p>
              <p class="text-xs font-mono mt-1">
                Total stores in database: {storesLoader.value.length} | EU stores: {storesLoader.value.filter((s) => s.isEU).length}
              </p>
            </div>
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
