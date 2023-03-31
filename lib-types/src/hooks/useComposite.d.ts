import type { Reference } from "~/types";
export type Composite = {
    focusable: Reference;
    navigables: Reference[];
};
export declare const useComposite: (store: Composite) => {
    focus$: import("@builder.io/qwik").QRL<(ref: Reference) => void>;
    moveFocus$: import("@builder.io/qwik").QRL<(to: string) => Promise<void>>;
};
//# sourceMappingURL=useComposite.d.ts.map