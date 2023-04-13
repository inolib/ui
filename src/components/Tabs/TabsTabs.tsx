import { $, component$, Slot, useContext, useOn } from "@builder.io/qwik";

import { contextId, moveFocusQrl } from "./Tabs";

type TabsTabsProps = {
  readonly styles?: string;
};

export const TabsTabs = component$<TabsTabsProps>(({ styles }) => {
  const context = useContext(contextId);

  useOn(
    "keydown",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowLeft": {
          await moveFocusQrl(context, "previous");
          break;
        }

        case "ArrowRight": {
          await moveFocusQrl(context, "next");
          break;
        }
      }
    })
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "End": {
          await moveFocusQrl(context, "last");
          break;
        }

        case "Home": {
          await moveFocusQrl(context, "first");
          break;
        }
      }
    })
  );

  return (
    <>
      <ul class={styles} preventdefault:keydown preventdefault:keyup role="tablist">
        <Slot />
      </ul>
    </>
  );
});
