import { $ } from "@builder.io/qwik";

export type Expandable = {
  expanded: boolean;
};

export const useExpandable = (store: Expandable) => {
  const collapse$ = $(() => {
    store.expanded = false;
  });

  const expand$ = $(() => {
    store.expanded = true;
  });

  return { collapse$, expand$ };
};
