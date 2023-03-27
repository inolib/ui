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
  disabled?: boolean;
  multiple?: boolean;
  name?: string;
  readonly?: boolean;
  required?: boolean;
  styles?: string;
  value?: unknown;
};

type Ref = Signal<HTMLElement | undefined>;

type Store = Composite &
  Expandable & {
    activated: Array<Ref>;
    controls: string;
    disabled: boolean;
    multiple: boolean;
    trigger: Ref;
  };

export const SelectContext = createContextId<Store>("inolib/ui/contexts/Select");

export const Select = component$<Props>(
  ({ disabled = false, multiple = false, name, readonly = false, required = false, styles, value }) => {
    const store = useStore<Store>(
      {
        activated: [],
        controls: "",
        disabled,
        focusable: useSignal<HTMLElement>(),
        expanded: false,
        multiple,
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
  }
);
