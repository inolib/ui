import { component$, Slot, useContext, useSignal, useStore } from "@builder.io/qwik";

import { contextId } from "~/components/Menu/Menu";
import type { Reference } from "~/types";

type MenuItemProps = {
  readonly styles?: string;
  readonly type?: string;
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

  return (
    <li
      ref={store.ref}
      role="item"
      tabIndex={store.ref === context.Menu.focusable ? 0 : -1}
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </li>
  );
});
