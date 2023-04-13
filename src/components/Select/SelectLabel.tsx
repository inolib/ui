import { component$, Slot, useContext, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";

import { contextId } from "./Select";

type SelectLabelProps = {
  styles?: string;
};

export type SelectLabelStore = {
  for?: string;
};

export const SelectLabel = component$<SelectLabelProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<SelectLabelStore>({}, { deep: true });

  useTask$(() => {
    context.SelectLabel = store;
  });

  useVisibleTask$(
    () => {
      if (context.SelectButton !== undefined) {
        store.for = context.SelectButton.id;
      }
    },
    { strategy: "document-ready" }
  );

  return (
    <label class={styles} for={store.for}>
      <Slot />
    </label>
  );
});
