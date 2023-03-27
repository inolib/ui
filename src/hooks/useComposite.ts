import { $, type Signal } from "@builder.io/qwik";

export type Composite = {
  focusable: Ref;
  navigables: Array<Ref>;
};

type Ref = Signal<HTMLElement | undefined>;

export const useComposite = (store: Composite) => {
  const focus$ = $((ref: Ref) => {
    store.focusable = ref;
    ref.value?.focus();
  });

  const moveFocus$ = $(async (to: string) => {
    const predicate = (to: string) => {
      switch (to) {
        case "first:checked":
        case "last:checked": {
          return (ref: Ref) => {
            const element = ref.value as HTMLElement;

            if (element.tagName === "INPUT") {
              const input = element as HTMLInputElement;

              if (input.type === "checkbox" || input.type === "radio") {
                return input.checked;
              }
            }

            return element.ariaChecked === "true";
          };
        }

        case "first:pressed":
        case "last:pressed": {
          return (ref: Ref) => ref.value?.ariaPressed === "true";
        }

        case "first:selected":
        case "last:selected": {
          return (ref: Ref) => ref.value?.ariaSelected === "true";
        }
      }

      return () => false;
    };

    switch (to) {
      case "first": {
        await focus$(store.navigables[0]);
        break;
      }

      case "first:checked":
      case "first:pressed":
      case "first:selected": {
        await focus$(store.navigables.find(predicate(to)) ?? store.navigables[0]);
        break;
      }

      case "last": {
        await focus$(store.navigables[store.navigables.length - 1]);
        break;
      }

      case "last:checked":
      case "last:pressed":
      case "last:selected": {
        await focus$(store.navigables.findLast(predicate(to)) ?? store.navigables[store.navigables.length - 1]);
        break;
      }

      case "next": {
        const index = store.navigables.indexOf(store.focusable);

        if (0 <= index && index <= store.navigables.length - 2) {
          await focus$(store.navigables[index + 1]);
        }

        break;
      }

      case "previous": {
        const index = store.navigables.lastIndexOf(store.focusable);

        if (index >= 1) {
          await focus$(store.navigables[index - 1]);
        }

        break;
      }
    }
  });

  return { focus$, moveFocus$ };
};
