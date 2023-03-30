import { $, useOn } from "@builder.io/qwik";

import type { Reference } from "~/types";

const tabbableElements = [
  "a[href]:not(disabled):not(hidden):not([tabindex='-1'])",
  "area[href]:not(disabled):not(hidden):not([tabindex='-1'])",
  "audio[controls]:not(disabled):not(hidden):not([tabindex='-1'])",
  "button:not(disabled):not(hidden):not([tabindex='-1'])",
  "form:not(disabled):not(hidden):not([tabindex='-1'])",
  "iframe:not(disabled):not(hidden):not([tabindex='-1'])",
  "input:not([type='hidden']):not(disabled):not(hidden):not([tabindex='-1'])",
  "object:not(disabled):not(hidden):not([tabindex='-1'])",
  "select:not(disabled):not(hidden):not([tabindex='-1'])",
  "summary:not(disabled):not(hidden):not([tabindex='-1'])",
  "textarea:not(disabled):not(hidden):not([tabindex='-1'])",
  "video[controls]:not(disabled):not(hidden):not([tabindex='-1'])",
  "[contenteditable]:not(disabled):not(hidden):not([tabindex='-1'])",
  "[tabindex]:not(disabled):not(hidden):not([tabindex='-1'])",
].join(",");

export const tabQrl = $((ref: Reference, to: string) => {
  const elements = Array.from(document.querySelectorAll(tabbableElements));
  const index = elements.findIndex((element) => element === ref.value);

  switch (to) {
    case "next": {
      if (index > -1 && index < elements.length - 1) {
        (elements[index + 1] as HTMLElement).focus();
      }
      break;
    }

    case "previous": {
      if (index > 0) {
        (elements[index - 1] as HTMLElement).focus();
      }
      break;
    }
  }
});

export const useTab = (ref: Reference) => {
  useOn(
    "keydown",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Tab": {
          await tabQrl(ref, !event.shiftKey ? "next" : "previous");
          break;
        }
      }
    })
  );
};
