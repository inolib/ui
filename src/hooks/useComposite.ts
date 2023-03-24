import { $, Signal } from "@builder.io/qwik";

export type Composite = {
  focusable: Signal<HTMLElement | undefined>;
  navigables: Array<Signal<HTMLElement | undefined>>;
};

export const useComposite = (store: Composite) => {
  const focus$ = $((ref: Signal<HTMLElement | undefined>) => {
    ref.value?.focus();
    store.focusable = ref;
  });

  const moveFocus$ = $(async (to: string) => {
    const isFocusable = (ref: Signal<HTMLElement | undefined>) => ref === store.focusable;
    const isSelected = (ref: Signal<HTMLElement | undefined>) => ref.value?.ariaSelected === "true";

    switch (to) {
      case "first": {
        await focus$(store.navigables[0]);
        break;
      }

      case "first:selected": {
        const ref = store.navigables.find(isSelected);

        if (ref !== undefined) {
          await focus$(ref);
        } else {
          await focus$(store.navigables[0]);
        }

        break;
      }

      case "last": {
        await focus$(store.navigables[store.navigables.length - 1]);
        break;
      }

      case "last:selected": {
        const ref = store.navigables.findLast(isSelected);

        if (ref !== undefined) {
          await focus$(ref);
        } else {
          await focus$(store.navigables[store.navigables.length - 1]);
        }

        break;
      }

      case "next": {
        const index = store.navigables.findIndex(isFocusable);

        if (0 <= index && index <= store.navigables.length - 2) {
          await focus$(store.navigables[index + 1]);
        }

        break;
      }

      case "previous": {
        const index = store.navigables.findLastIndex(isFocusable);

        if (index >= 1) {
          await focus$(store.navigables[index - 1]);
        }

        break;
      }
    }
  });

  const toggle$ = $((ref: Signal<HTMLElement | undefined>) => {
    const element = ref.value;

    if (element !== undefined) {
      element.ariaSelected = element.ariaSelected === "true" ? "false" : "true";
    }
  });

  return { focus$, moveFocus$, toggle$ };
};
