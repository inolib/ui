import { $, component$, Slot, useContext, useOn, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { contextId, moveFocusQrl } from "~/components/Menu/Menu";

type MenuItemListProps = {
  readonly styles?: string;
};

export type MenuItemListStore = {
  readonly id: string;
};

export const MenuItemList = component$<MenuItemListProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<MenuItemListStore>(
    {
      id: nanoid(),
    },
    { deep: true }
  );

  useOn(
    "keyup",
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
    context.MenuItemList = store;
  });

  return (
    <>
      {context.MenuButton?.expanded ? (
        <ul class={styles} id={store.id}>
          <Slot />
        </ul>
      ) : null}
    </>
  );
});
