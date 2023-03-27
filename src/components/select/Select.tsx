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
  value?: Value;
};

type Ref = Signal<HTMLElement | undefined>;

type Store = Composite &
  Expandable & {
    activated: Array<{ id: string; ref: Ref; value: Value }>;
    controls: string;
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    trigger: Ref;
  };

export type Value = string | Record<string, boolean | number | string>;

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
        readonly,
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

        {name !== undefined
          ? store.activated.map((option) =>
              typeof option.value === "string" ? (
                <input
                  key={option.id}
                  name={`${name}${multiple ? "[]" : ""}`}
                  type="hidden"
                  value={`${option.value}`}
                />
              ) : (
                Object.entries(option.value).map((kv) => (
                  <input
                    key={option.id}
                    name={`${name}${multiple ? "[]" : ""}[${kv[0]}]`}
                    type="hidden"
                    value={`${kv[1] as string}`}
                  />
                ))
              )
            )
          : null}
      </div>
    );
  }
);
