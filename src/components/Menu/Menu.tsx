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

type Props = {
  styles?: string;
  value?: Value;
};

type Ref = Signal<HTMLElement | undefined>;

type Store = Composite &
  Expandable & {
    activated: Array<{ id: string; ref: Ref; value: Value }>;
    controls: string;
    trigger: Ref;
  };

export type Value = string | Record<string, boolean | number | string>;

export const MenuContext = createContextId<Store>("inolib/ui/contexts/Menu");

export const Menu = component$<Props>(({ styles }) => {
  const store = useStore<Store>(
    {
      activated: [],
      controls: "",
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
    <div {...(styles !== undefined ? { class: styles } : {})}>
      <Slot />
    </div>
  );
});
