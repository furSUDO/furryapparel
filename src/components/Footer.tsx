import { component$ } from "@builder.io/qwik";

export default component$((props: any) => {
  const { storesLoader } = props;

  return (
    <div class="mt-12 border-t-2 border-black pt-6 opacity-60 dark:border-white">
      <p class="font-mono text-xs">
        $ furry-apparel-index v1.0 | Maintained by {" "}
        <a href="https://bsky.app/profile/did:plc:aakmgpxyqmyzdq27ilyqirev" target="_blank" class="underline">SUDO</a>
      </p>
      <p class="mt-1 font-mono text-xs">Total stores in database: {storesLoader.value.length} | EU stores: {storesLoader.value.filter((s: any) => s.isEU).length}</p>
    </div>
  );
});
