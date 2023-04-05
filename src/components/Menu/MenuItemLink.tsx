import { component$, Slot, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
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

  // useOn(
  //   "keyup",
  //   $((e) => {
  //     const event = e as KeyboardEvent;

  //     switch (event.code) {
  //       case "Enter": {
  //         window.location.href = href;
  //         break;
  //       }
  //     }
  //   })
  // );

  const navigate = useNavigate();

  useTask$(() => {
    if (context.MenuItemLink === undefined) {
      context.MenuItemLink = [];
    }

    context.MenuItemLink.push(store);
  });

  return (
    <li role="presentation" class={styles}>
      <a
        aria-current={store.selected ? "page" : undefined}
        href={href}
        ref={store.ref}
        role="menuitem"
        tabIndex={store.ref === context.Menu.focusable ? 0 : -1}
        onKeyUp$={async (event) => {
          switch (event.keyCode) {
            case 13: {
              await navigate(href);
              break;
            }
          }
        }}
      >
        <Slot />
      </a>
    </li>
  );
});
