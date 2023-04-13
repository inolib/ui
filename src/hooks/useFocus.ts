import { useVisibleTask$ } from "@builder.io/qwik";

import { Reference } from "../types";

type Focus = {
  focused?: Reference;
};

export const useFocus = (store: Focus) => {
  useVisibleTask$(
    ({ track }) => {
      const element = track(() => store.focused?.value);
      console.log(element);

      element?.focus();
    },
    { strategy: "document-ready" }
  );
};
