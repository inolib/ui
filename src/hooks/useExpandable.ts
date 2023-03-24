import { $, Signal } from "@builder.io/qwik";

export type Expandable = {
  isExpanded: boolean;
  trigger: Signal<HTMLElement | undefined>;
};

export const useExpandable = (store: Expandable) => {
  const collapse$ = $(() => {
    store.isExpanded = false;
  });

  const expand$ = $(() => {
    store.isExpanded = true;
  });

  return { collapse$, expand$ };
};
