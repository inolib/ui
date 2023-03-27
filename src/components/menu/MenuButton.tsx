import { $, component$, Slot, useContext, useOn, useSignal, useTask$ } from "@builder.io/qwik";

import { MenuContext } from "~/components/menu/Menu";
import { useComposite } from "~/hooks/useComposite";
import { useExpandable } from "~/hooks/useExpandable";

export const MenuButton = component$(() => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(MenuContext);

  const { focus$, moveFocus$ } = useComposite(store);
  const { collapse$, expand$ } = useExpandable(store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Space": {
          await expand$();
          await moveFocus$("first:selected");
          break;
        }
      }
    })
  );

  useOn(
    "click",
    $(async (e) => {
      const event = e as MouseEvent;

      if (event.detail > 0 && event.button === 0) {
        if (store.expanded) {
          await collapse$();
          await focus$(ref);
        } else {
          await expand$();
          await moveFocus$("first:selected");
        }
      }
    })
  );

  useTask$(() => {
    store.trigger = ref;
  });

  return (
    <button ref={ref}>
      <Slot />
    </button>
  );
});
