import { component$, Slot, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import { contextId } from "~/components/Menu/Menu";
import type { Reference } from "~/types";

type MenuItemProps = {
  styles?: string;
};

export type MenuItemStore = {
  readonly ref: Reference;
};

export const MenuItem = component$<MenuItemProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<MenuItemStore>(
    {
      ref: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  useTask$(() => {
    if (context.MenuItem === undefined) {
      context.MenuItem = [];
    }

    context.MenuItem.push(store);
  });

  return (
    <li class={styles} ref={store.ref} role="menuitem" tabIndex={store.ref === context.Menu.focusable ? 0 : -1}>
      <Slot />
    </li>
  );
});
