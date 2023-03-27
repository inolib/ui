import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOn,
  useSignal,
  useStore,
  type Signal,
} from "@builder.io/qwik";

import { useComposite, type Composite } from "~/hooks/useComposite";
import { useExpandable, type Expandable } from "~/hooks/useExpandable";

type Store = Composite &
  Expandable & {
    trigger: Signal<HTMLElement | undefined>;
  };

export const MenuContext = createContextId<Store>("inolib/ui/contexts/Menu");

export const Menu = component$(() => {
  const store = useStore<Store>(
    {
      expanded: false,
      focusable: useSignal<HTMLElement>(),
      navigables: [],
      trigger: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  const { collapse$ } = useExpandable(store);
  const { focus$ } = useComposite(store);

  useContextProvider(MenuContext, store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Escape": {
          await collapse$();
          await focus$(store.trigger);
          break;
        }
      }
    })
  );

  return (
    <div role="menu">
      <Slot />
    </div>
  );
});
