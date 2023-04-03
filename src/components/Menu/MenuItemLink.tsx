import { component$, Slot, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import { contextId } from "~/components/Menu/Menu";
import type { Reference } from "~/types";

type MenuItemLinkProps = {
  readonly href: string;
  readonly styles?: string;
};

export type MenuItemLinkStore = {
  readonly ref: Reference;
  readonly selected: boolean;
};

export const MenuItemLink = component$<MenuItemLinkProps>(({ href, styles }) => {
  const context = useContext(contextId);

  const store = useStore<MenuItemLinkStore>(
    {
      ref: useSignal<HTMLElement>(),
      selected: useLocation().url.pathname === (href.endsWith("/") ? href : `${href}/`),
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
    <li role="presentation">
      <a
        aria-current={store.selected ? "page" : undefined}
        class={styles}
        href={href}
        ref={store.ref}
        role="menuitem"
        tabIndex={store.ref === context.Menu.focusable ? 0 : -1}
      >
        <Slot />
      </a>
    </li>
  );
});
