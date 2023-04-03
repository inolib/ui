import { $, useOn } from "@builder.io/qwik";

const selectors =
  "a[href], area[href], audio[controls], button, form, iframe, input:not([type='hidden']), object, select, summary, textarea, video[controls], [contenteditable], [tabindex]";

export const tabQrl = $((to: string) => {
  const focused = document.activeElement;

  const tabbables = Array.from(document.querySelectorAll(selectors)).filter((element) => {
    let disabled = false;

    switch (element.tagName) {
      case "BUTTON": {
        disabled = (element as HTMLButtonElement).disabled;
        break;
      }

      case "INPUT": {
        disabled = (element as HTMLInputElement).disabled;
        break;
      }

      case "SELECT": {
        disabled = (element as HTMLSelectElement).disabled;
        break;
      }

      case "TEXTAREA": {
        disabled = (element as HTMLTextAreaElement).disabled;
        break;
      }
    }

    const focusable = (element as HTMLElement).tabIndex !== -1;
    const visible = element.getClientRects().length > 0;

    return !disabled && focusable && visible;
  });

  const index = tabbables.findIndex((element) => element === focused);

  switch (to) {
    case "next": {
      if (index > -1 && index < tabbables.length - 1) {
        (tabbables[index + 1] as HTMLElement).focus();
      }
      break;
    }

    case "previous": {
      if (index > 0) {
        (tabbables[index - 1] as HTMLElement).focus();
      }
      break;
    }
  }
});

export const useTab = () => {
  useOn(
    "keydown",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Tab": {
          await tabQrl(!event.shiftKey ? "next" : "previous");
          break;
        }
      }
    })
  );
};
