import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSuggestAction } from "~/routes/layout";



export default component$((props: any) => {
  const { suggestionsOpen } = props;

  if (!suggestionsOpen?.value) return null;

  const action = useSuggestAction();

  return (
    <div class="space-y-2 border-2 border-black bg-white p-2 dark:border-white dark:bg-black">
      <Form class="space-y-2" action={action}>
        <input
          id="name"
          name="name"
          aria-label="Store name"
          type="text"
          required
          placeholder="Store name"
          class="w-full border-2 border-black bg-white p-2 font-mono text-xs focus:invert focus:outline-none dark:border-white dark:bg-black dark:focus:invert"
        />

        <input
          id="url"
          name="url"
          aria-label="Store URL"
          type="url"
          placeholder="https://furrygamejam.com"
          class="w-full border-2 border-black bg-white p-2 font-mono text-xs focus:invert focus:outline-none dark:border-white dark:bg-black dark:focus:invert"
        />

        <input
          id="tags"
          name="tags"
          aria-label="Tags (comma separated)"
          type="text"
          placeholder="some tags (comma separated)"
          class="w-full border-2 border-black bg-white p-2 font-mono text-xs focus:invert focus:outline-none dark:border-white dark:bg-black dark:focus:invert"
        />

        <textarea
          id="message"
          name="message"
          aria-label="Why should it be added?"
          placeholder="Why should it be added?"
          class="w-full resize-none border-2 border-black bg-white p-2 font-mono text-xs focus:invert focus:outline-none dark:border-white dark:bg-black dark:focus:invert"
        ></textarea>

        {/* <input type="hidden" name="cfTurnstileToken" />

        <div
          class="cf-turnstile"
          data-sitekey="0x4AAAAAACV0x6XByGfY0QOB"
          data-callback="onTurnstileToken"
          data-expired-callback="onTurnstileExpired"
        ></div> */}

        <p class="mt-2 font-mono text-xs opacity-70">
          Suggestions are sent to a maintainer via Discord. The webhook is not
          stored in client code.
        </p>

        <button
          type="submit"
          class="w-full bg-white invert p-2 font-mono text-xs font-bold text-black hover:invert focus:invert dark:bg-black dark:text-white border-2 border-black dark:border-white"
        >
          SUBMIT
        </button>


        {action.value?.success && (
          <p class="mt-2 font-mono text-xs text-green-600">Suggestion sent</p>
        )}

        {action.value && action.value.error && (
          <p class="mt-2 font-mono text-xs text-red-600">
            Error: {action.value.error}
          </p>
        )}
      </Form>
    </div>
  );
});
