import { type TabsContext } from "~/components/Tabs/Tabs";
import type { Reference } from "~/types";
type TabsTabProps = {
    readonly controls: string;
    readonly selected?: boolean;
    readonly styles?: string;
};
export type TabsTabStore = {
    controls: string;
    readonly ref: Reference;
    selected: boolean;
};
export declare const selectQrl: import("@builder.io/qwik").QRL<(context: TabsContext, store: TabsTabStore, moveFocus?: boolean) => Promise<void>>;
export declare const TabsTab: import("@builder.io/qwik").Component<TabsTabProps>;
export {};
//# sourceMappingURL=TabsTab.d.ts.map