type CollapseQRL = () => void;
type MakeCollapsibleQRL = (controller: HTMLElement, controlled: HTMLElement) => void;
export declare const useCollapsible: () => {
    makeCollapsible$: import("@builder.io/qwik").QRL<MakeCollapsibleQRL>;
    collapse$: import("@builder.io/qwik").QRL<CollapseQRL>;
};
export {};
//# sourceMappingURL=useCollapsible.d.ts.map