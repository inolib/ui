import type { Reference } from "~/types";
type TabsItemProps = {
    panelId: string;
    selected?: boolean;
    styles?: string;
};
export type TabsItemStore = {
    controls?: string | undefined;
    readonly ref: Reference;
    selected: boolean;
    tabIndex?: number;
};
export declare const TabsItem: import("@builder.io/qwik").Component<TabsItemProps>;
export {};
//# sourceMappingURL=TabsItem.d.ts.map