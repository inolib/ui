import { $, type Signal } from "@builder.io/qwik";

export type Composite = {
  focusable: Ref;
  navigables: Array<Ref>;
};

type Disableable =
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLOptGroupElement
  | HTMLOptionElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

type Ref = Signal<HTMLElement | undefined>;

type Store = {
  focusable: Ref;
};

export const useComposite = (store: Composite) => {
  const _store: Store = {
    focusable: store.focusable,
  };

  const focus$ = $(async (ref: Ref, from = "next") => {
    const whenDisabled = async (from: string) => {
      switch (from) {
        case "first":
        case "next": {
          await moveFocus$("next");
          break;
        }

        case "last":
        case "previous": {
          await moveFocus$("previous");
          break;
        }

        case "first:checked":
        case "first:pressed":
        case "first:selected":
        case "next:checked":
        case "next:pressed":
        case "next:selected": {
          await moveFocus$(from.replace("first", "next"));
          break;
        }

        case "last:checked":
        case "last:pressed":
        case "last:selected":
        case "previous:checked":
        case "previous:pressed":
        case "previous:selected": {
          await moveFocus$(from.replace("last", "previous"));
          break;
        }
      }
    };

    const element = ref.value;

    _store.focusable = ref;

    switch (element?.tagName) {
      case "BUTTON":
      case "FIELDSET":
      case "INPUT":
      case "OPTGROUP":
      case "OPTION":
      case "SELECT":
      case "TEXTAREA": {
        if ((element as Disableable).disabled) {
          await whenDisabled(from);
          return;
        }
        break;
      }

      default: {
        if (element?.ariaDisabled === "true") {
          await whenDisabled(from);
          return;
        }
        break;
      }
    }

    store.focusable = _store.focusable;
    element?.focus();
  });

  const moveFocus$ = $(async (to: string) => {
    const predicate = (to: string) => {
      switch (to) {
        case "first:checked":
        case "last:checked":
        case "next:checked":
        case "previous:checked": {
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
        case "last:pressed":
        case "next:pressed":
        case "previous:pressed": {
          return (ref: Ref) => ref.value?.ariaPressed === "true";
        }

        case "first:selected":
        case "last:selected":
        case "next:selected":
        case "previous:selected": {
          return (ref: Ref) => ref.value?.ariaSelected === "true";
        }
      }

      return () => false;
    };

    switch (to) {
      case "first": {
        await focus$(store.navigables[0], to);
        break;
      }

      case "first:checked":
      case "first:pressed":
      case "first:selected": {
        await focus$(store.navigables.find(predicate(to)) ?? store.navigables[0], to);
        break;
      }

      case "last": {
        await focus$(store.navigables[store.navigables.length - 1], to);
        break;
      }

      case "last:checked":
      case "last:pressed":
      case "last:selected": {
        await focus$(store.navigables.findLast(predicate(to)) ?? store.navigables[store.navigables.length - 1], to);
        break;
      }

      case "next": {
        const index = store.navigables.indexOf(_store.focusable);

        if (0 <= index && index <= store.navigables.length - 2) {
          await focus$(store.navigables[index + 1], to);
        }

        break;
      }

      case "next:checked":
      case "next:pressed":
      case "next:selected": {
        const navigables = store.navigables.slice(store.navigables.indexOf(_store.focusable) + 1);
        const index = navigables.findIndex(predicate(to));

        if (index >= 0) {
          await focus$(navigables[index], to);
        }

        break;
      }

      case "previous": {
        const index = store.navigables.lastIndexOf(_store.focusable);

        if (index >= 1) {
          await focus$(store.navigables[index - 1], to);
        }

        break;
      }

      case "previous:checked":
      case "previous:pressed":
      case "previous:selected": {
        const navigables = store.navigables.slice(0, store.navigables.lastIndexOf(_store.focusable));
        const index = navigables.findLastIndex(predicate(to));

        if (index >= 0) {
          await focus$(navigables[index], to);
        }

        break;
      }
    }
  });

  return { focus$, moveFocus$ };
};
