import { $, component$, Slot, useContext, useOn, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { contextId, moveFocusQrl } from "~/components/Menu/Menu";

type MenuItemsProps = {
  readonly styles?: string;
};

export type MenuItemsStore = {
  readonly id: string;
};

export const MenuItems = component$<MenuItemsProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<MenuItemsStore>(
    {
      id: nanoid(),
    },
    { deep: true }
  );

  useOn(
    "keydown",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowDown": {
          await moveFocusQrl(context, "next");
          break;
        }

        case "ArrowUp": {
          await moveFocusQrl(context, "previous");
          break;
        }
      }
    })
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "End": {
          await moveFocusQrl(context, "last");
          break;
        }

        case "Home": {
          await moveFocusQrl(context, "first");
          break;
        }
      }
    })
  );

  useTask$(() => {
    context.MenuItems = store;
  });

  return (
    <>
      {context.MenuButton?.expanded ? (
        <ul class={styles} id={store.id} preventdefault:keydown preventdefault:keyup role="menu">
          <Slot />
        </ul>
      ) : null}
    </>
  );
});
