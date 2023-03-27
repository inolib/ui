import { type Signal } from "@builder.io/qwik";
export type Composite = {
    focusable: Ref;
    navigables: Array<Ref>;
};
type Ref = Signal<HTMLElement | undefined>;
export declare const useComposite: (store: Composite) => {
    focus$: import("@builder.io/qwik").QRL<(ref: Ref) => void>;
    moveFocus$: import("@builder.io/qwik").QRL<(to: string) => Promise<void>>;
};
export {};
//# sourceMappingURL=useComposite.d.ts.map