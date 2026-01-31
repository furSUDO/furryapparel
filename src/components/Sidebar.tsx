import { component$ } from "@builder.io/qwik";
import { COUNTRIES } from "../lib/apparel";
import SuggestForm from "./SuggestionForm";

export default component$((props: any) => {
  const {
    searchQuery,
    selectedCountry,
    showEUOnly,
    showNSFW,
    updateFilteredStores,
    suggestionsOpen,
  } = props;

  return (
    <div class="w-full space-y-6 border-r-2 border-black p-6 lg:w-80 dark:border-white">
      <div class="space-y-2">
        <label class="block font-mono text-sm font-bold">$ SEARCH STORES</label>
        <input
          type="text"
          placeholder="name, tag, or description..."
          value={searchQuery.value}
          onInput$={(e: any) => {
            searchQuery.value = (e.target as HTMLInputElement).value;
            updateFilteredStores();
          }}
          class="w-full border-2 border-black bg-white p-2 font-mono text-sm focus:invert focus:outline-none dark:border-white dark:bg-black dark:focus:invert"
        />
      </div>

      <div class="space-y-2">
        <label class="block font-mono text-sm font-bold">$ COUNTRY/REGION</label>
        <select
          value={selectedCountry.value}
          onChange$={(e: any) => {
            selectedCountry.value = (e.target as HTMLSelectElement).value;
            updateFilteredStores();
          }}
          class="w-full cursor-pointer border-2 border-black bg-white p-2 font-mono text-sm focus:invert focus:outline-none dark:border-white dark:bg-black dark:focus:invert"
        >
          <option value="">-- All Regions --</option>
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-2">
          <label class="flex cursor-pointer items-center gap-2 font-mono text-sm">
            <input
              type="checkbox"
              checked={showEUOnly.value}
              onChange$={(e: any) => {
                showEUOnly.value = (e.target as HTMLInputElement).checked;
                updateFilteredStores();
              }}
              class="h-4 w-4 cursor-pointer border-2 border-black dark:border-white"
            />
            <span class="font-bold">EU ONLY</span>
          </label>
          <p class="font-mono text-xs opacity-70">Filter stores from EU members</p>
        </div>

        <div class="space-y-2">
          <label class="flex cursor-pointer items-center gap-2 font-mono text-sm">
            <input
              type="checkbox"
              checked={showNSFW.value}
              onChange$={(e: any) => {
                showNSFW.value = (e.target as HTMLInputElement).checked;
                updateFilteredStores();
              }}
              class="h-4 w-4 cursor-pointer border-2 border-black dark:border-white"
            />
            <span class="font-bold">Show NSFW</span>
          </label>
          <p class="font-mono text-xs opacity-70">Show stores marked as NSFW</p>
        </div>
      </div>

      <div class="border-t-2 border-black dark:border-white"></div>

      <div class="space-y-2">
        <button
          onClick$={() => (suggestionsOpen.value = !suggestionsOpen.value)}
          class="w-full border-2 border-black bg-white p-2 font-mono text-sm font-bold transition-colors hover:invert dark:border-white dark:bg-black dark:hover:invert"
        >
          {suggestionsOpen.value ? "[-] SUGGEST STORE" : "[+] SUGGEST STORE"}
        </button>

        <SuggestForm suggestionsOpen={suggestionsOpen} />
      </div>
    </div>
  );
});
