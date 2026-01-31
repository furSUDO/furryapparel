import { component$, Slot } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useSuggestAction = routeAction$(async (data, requestEvent) => {
    const webhook = requestEvent.platform.env?.DISCORD_WEBHOOK_URL;
    // See this shit below? I have been trying ot get it to work for fucking HOURS
    // WHO CARES if I get spammed to hell and back I DON'T
    // FUCK!!!!!!!!!!!
    // const turnstileSecret = requestEvent.platform.env?.TURNSTILE_SECRET;
  console.log(webhook);
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `New suggestion:\nName: ${data.name}\nURL: ${data.url}\nTags: ${data.tags}\nMessage: ${data.message}`,
        }),
      });
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  return { success: true };
});

export default component$(() => {
  return (
    <>
        <Slot />
    </>
  );
});
