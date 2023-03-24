import { Signal } from "@builder.io/qwik";
export type Composite = {
    focusable: Signal<HTMLElement | undefined>;
    navigables: Array<Signal<HTMLElement | undefined>>;
};
export declare const useComposite: (store: Composite) => {
    focus$: import("@builder.io/qwik").QRL<(ref: Signal<HTMLElement | undefined>) => void>;
    moveFocus$: import("@builder.io/qwik").QRL<(to: string) => Promise<void>>;
    toggle$: import("@builder.io/qwik").QRL<(ref: Signal<HTMLElement | undefined>) => void>;
};
//# sourceMappingURL=useComposite.d.ts.map