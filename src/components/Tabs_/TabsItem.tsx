import { $, component$, Slot, useOn, useSignal, useContext } from "@builder.io/qwik";
import { useComposite } from "~/hooks/useComposite";
import { useToggle } from "~/hooks/useToggle";
import { TabsContext } from "./Tabs";

export const TabsItem = component$(() => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(TabsContext);

  const { focus$ } = useComposite(store);
  const { toggle$ } = useToggle();

  const expand$ = $((panelId: string) => {
    // TODO
  });

  useOn(
    "click",
    $(async (e) => {
      const event = e as MouseEvent;

      if (event.detail > 0 && event.button === 0) {
        await toggle$(ref, "pressed");
      }
    })
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Enter":
        case "Space": {
          await expand$(/* panelId */);
          break;
        }
      }
    })
  );

  return (
    <li aria-controls={panelId} role="tab">
      <Slot />
    </li>
  );
});
