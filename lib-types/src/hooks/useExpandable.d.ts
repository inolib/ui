import { Signal } from "@builder.io/qwik";
export type Expandable = {
    isExpanded: boolean;
    trigger: Signal<HTMLElement | undefined>;
};
export declare const useExpandable: (store: Expandable) => {
    collapse$: import("@builder.io/qwik").QRL<() => void>;
    expand$: import("@builder.io/qwik").QRL<() => void>;
};
//# sourceMappingURL=useExpandable.d.ts.map