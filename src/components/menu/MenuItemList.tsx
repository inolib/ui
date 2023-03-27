import { component$, Slot, useContext } from "@builder.io/qwik";

import { MenuContext } from "~/components/menu/Menu";

export const MenuItemList = component$(() => {
  const store = useContext(MenuContext);

  return (
    <ul hidden={store.expanded}>
      <Slot />
    </ul>
  );
});
