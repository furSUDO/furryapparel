import { component$ } from "@builder.io/qwik";
import type { ApparelStore } from "../lib/apparel";
import { ICON_MAP } from "../lib/apparel";

export default component$((props: { store: ApparelStore }) => {
  const { store } = props;

  return (
    <div class="flex flex-col border-2 border-black p-4 transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
      <div class="col-span-6 row-span-1 mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="font-mono text-lg font-bold">
            {store.name}
            {store.nsfw && (
              <span class="ml-2 text-xs text-red-600 dark:text-red-400">
                (NSFW)
              </span>
            )}
          </h3>
          <p class="font-mono text-sm">
            {store.country} ({store.countryCode})
          </p>
        </div>
        <div class="mb-auto flex flex-wrap justify-end-safe gap-2">
          {store.tags.map((tag) => (
            <span
              key={tag.trim()}
              class="border-2 border-current px-2 py-1 font-mono text-xs font-bold"
            >
              {tag.trim()}
            </span>
          ))}
          {store.isEU && (
            <span class="border-2 border-current px-2 py-1 font-mono text-xs font-bold">
              🇪🇺 EU
            </span>
          )}
        </div>
      </div>

      <p class="mb-3 font-mono text-sm opacity-80">{store.description}</p>

      <div class="mt-auto flex flex-wrap gap-2">
        <a
          href={store.url}
          target="_blank"
          class="inline-flex items-center gap-2 border-2 border-current px-3 py-1 font-mono text-xs font-bold transition-colors active:invert dark:active:invert"
        >
          VISIT →
        </a>
        {store.socials &&
          store.socials.map((social) => {
            const norm = (social.platform || "").trim().toLowerCase();
            const icon =
              ICON_MAP[norm] ?? ICON_MAP[norm.replace(/\s+|-|_/g, "")];

            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                aria-label={social.platform}
                class="inline-flex items-center gap-2 border-2 border-current px-3 py-1 font-mono text-xs font-bold transition-colors active:invert dark:active:invert"
              >
                {icon ? (
                  icon.path ? (
                    <svg
                      viewBox={"0 0 24 24"}
                      width="12"
                      height="12"
                      style="width:0.75rem;height:0.75rem;display:inline-block"
                      preserveAspectRatio="xMidYMid meet"
                      class="h-3 w-3"
                      role="img"
                      aria-label={icon.title || social.platform}
                    >
                      <path d={icon.path} fill="currentColor" />
                    </svg>
                  ) : (
                    social.platform.toUpperCase()
                  )
                ) : (
                  social.platform.toUpperCase()
                )}
              </a>
            );
          })}
      </div>
    </div>
  );
});
