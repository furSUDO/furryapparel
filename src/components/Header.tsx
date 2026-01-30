import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="border-b-2 border-black p-4 dark:border-white">
      <h1 class="mb-2 font-mono text-2xl font-bold">FURRY APPAREL INDEX</h1>
      <p class="font-mono text-sm opacity-80">A curated index of furry apparel stores worldwide.</p>
    </div>
  );
});
