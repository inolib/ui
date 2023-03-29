import { component$, Slot, useContext, useSignal, useTask$ } from "@builder.io/qwik";

import { MenuContext } from "~/components/menu/Menu";

type Props = {
  styles?: string;
  type?: string;
};

export const MenuItem = component$<Props>(({ styles }) => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(MenuContext);

  useTask$(() => {
    store.navigables.push(ref);
  });

  return (
    <li
      ref={ref}
      role="item"
      tabIndex={store.focusable === ref ? 0 : -1}
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </li>
  );
});
