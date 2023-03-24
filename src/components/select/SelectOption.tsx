import { $, component$, Slot, useContext, useOn, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import { SelectContext } from "~/components/select/Select";
import { useComposite } from "~/hooks/useComposite";

type Props = {
  isDisabled?: boolean;
  styles?: string;
  value?: unknown;
};

export const SelectOption = component$<Props>(({ isDisabled = false, styles, value }) => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(SelectContext);

  const { focus$, toggle$ } = useComposite(store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Space": {
          await toggle$(ref);
          break;
        }
      }
    })
  );

  useOn(
    "mouseup",
    $(async () => {
      await focus$(ref);
      await toggle$(ref);
    })
  );

  useVisibleTask$(
    () => {
      store.navigables.push(ref);
    },
    { strategy: "document-ready" }
  );

  return (
    <li
      aria-disabled={isDisabled}
      {...(!isDisabled ? { "aria-selected": ref.value?.ariaSelected === "true" } : {})}
      ref={ref}
      role="option"
      tabIndex={store.focusable === ref ? 0 : -1}
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </li>
  );
});
