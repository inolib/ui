import { $ } from "@builder.io/qwik";

import type { Reference } from "~/types";

export const useToggle = () => {
  const toggle$ = $((ref: Reference, state: string) => {
    const element = ref.value;

    if (element !== undefined) {
      switch (state) {
        case "checked": {
          if (element.tagName === "INPUT") {
            const input = element as HTMLInputElement;

            if (input.type === "checkbox" || input.type === "radio") {
              input.checked = !input.checked;
              break;
            }
          }

          element.ariaChecked = element.ariaChecked === "true" ? "false" : "true";
          break;
        }

        case "pressed": {
          element.ariaPressed = element.ariaPressed === "true" ? "false" : "true";
          break;
        }

        case "selected": {
          element.ariaSelected = element.ariaSelected === "true" ? "false" : "true";
          break;
        }
      }
    }
  });

  return { toggle$ };
};
