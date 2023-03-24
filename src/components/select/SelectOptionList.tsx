import { $, component$, Slot, useContext, useOn } from "@builder.io/qwik";

import { SelectContext } from "~/components/select/Select";
import { useComposite } from "~/hooks/useComposite";

type Props = {
  styles?: string;
};

export const SelectOptionList = component$<Props>(({ styles }) => {
  const store = useContext(SelectContext);

  const { moveFocus$ } = useComposite(store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowDown": {
          await moveFocus$("next");
          break;
        }

        case "ArrowUp": {
          await moveFocus$("previous");
          break;
        }
      }
    })
  );

  return (
    <>
      {store.isExpanded ? (
        <ul aria-multiselectable={store.isMultiple} role="listbox" {...(styles !== undefined ? { class: styles } : {})}>
          <Slot />
        </ul>
      ) : null}
    </>
  );
});
