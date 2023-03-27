import { $, component$, Slot, useContext, useOn, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";

import { SelectContext } from "~/components/select/Select";
import { useComposite } from "~/hooks/useComposite";
import { useToggle } from "~/hooks/useToggle";

type Props = {
  disabled?: boolean;
  selected?: boolean;
  styles?: string;
  value?: unknown;
};

export const SelectOption = component$<Props>(({ disabled = false, selected = false, styles, value }) => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(SelectContext);

  const { focus$ } = useComposite(store);
  const { toggle$ } = useToggle();

  const doToggle$ = $(async () => {
    if (!store.multiple && store.activated.length === 1 && store.activated[0] !== ref) {
      await toggle$(store.activated[0], "selected");
      store.activated.pop();
    }

    await toggle$(ref, "selected");

    if (ref.value?.ariaSelected === "true") {
      store.activated.push(ref);
    } else {
      const index = store.activated.indexOf(ref);

      if (index >= 0) {
        store.activated.splice(index, 1);
      }
    }

    await focus$(ref);
  });

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Space": {
          await doToggle$();
          break;
        }
      }
    })
  );

  useOn(
    "click",
    $(async (e) => {
      const event = e as MouseEvent;

      if (event.detail > 0) {
        await doToggle$();
      }
    })
  );

  useTask$(() => {
    if (selected) {
      store.activated.push(ref);
    }

    store.navigables.push(ref);
  });

  useVisibleTask$(
    () => {
      if (selected) {
        const element = ref.value;

        if (element !== undefined) {
          element.ariaSelected = "true";
        }
      }
    },
    { strategy: "document-ready" }
  );

  return (
    <li
      aria-disabled={disabled}
      ref={ref}
      role="option"
      tabIndex={store.focusable === ref ? 0 : -1}
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </li>
  );
});
