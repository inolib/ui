import { component$, Slot } from "@builder.io/qwik";

type TabsPanelsProps = {
  readonly styles?: string;
};

export const TabsPanels = component$<TabsPanelsProps>(({ styles }) => {
  return (
    <div class={styles}>
      <Slot />
    </div>
  );
});
