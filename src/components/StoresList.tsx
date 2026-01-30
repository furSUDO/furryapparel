import { component$ } from "@builder.io/qwik";
import type { ApparelStore } from "../lib/apparel";
import StoreCard from "./StoreCard";

export default component$((props: { filteredStores: ApparelStore[]; showNSFW: boolean }) => {
  const { filteredStores, showNSFW } = props;

  return (
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {filteredStores.length > 0 ? (
        filteredStores.filter((store) => !store.nsfw || showNSFW).map((store) => (
          <StoreCard key={store.id} store={store} />
        ))
      ) : (
        <div class="border-2 border-black p-6 text-center dark:border-white">
          <p class="font-mono text-sm opacity-70">NO STORES FOUND. TRY ADJUSTING YOUR FILTERS.</p>
        </div>
      )}
    </div>
  );
});
