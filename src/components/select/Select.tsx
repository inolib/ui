import { $, component$, createContextId, Slot, useContextProvider, useOn, useSignal, useStore } from "@builder.io/qwik";

import { useComposite, type Composite } from "~/hooks/useComposite";
import { useExpandable, type Expandable } from "~/hooks/useExpandable";

type Props = {
  isDisabled?: boolean;
  isMultiple?: boolean;
  name?: string;
  styles?: string;
  value?: unknown;
};

type Store = Composite &
  Expandable & {
    isDisabled: boolean;
    isMultiple: boolean;
  };

export const SelectContext = createContextId<Store>("inolib/ui/contexts/Select");

export const Select = component$<Props>(({ isDisabled = false, isMultiple = false, name, styles, value }) => {
  const store = useStore<Store>(
    {
      focusable: useSignal<HTMLElement>(),
      isDisabled: isDisabled,
      isExpanded: false,
      isMultiple: isMultiple,
      navigables: [],
      trigger: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  const { focus$ } = useComposite(store);
  const { collapse$ } = useExpandable(store);

  useContextProvider(SelectContext, store);

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
