import type { TabsPanelProps, TabsPanelStore } from "~/components/Tabs/TabsPanel";
import type { TabsTabStore } from "~/components/Tabs/TabsTab";
import type { Reference } from "~/types";
export declare const focusQrl: import("@builder.io/qwik").QRL<(context: TabsContext, ref: Reference, moveFocus?: boolean) => void>;
export declare const moveFocusQrl: import("@builder.io/qwik").QRL<(context: TabsContext, to: string) => Promise<void>>;
export type TabsContext = {
    Tabs: TabsStore;
    TabsTab?: TabsTabStore[];
    TabsPanel?: {
        props: TabsPanelProps;
        store: TabsPanelStore;
    }[];
};
type TabsProps = {
    readonly styles?: string;
};
type TabsStore = {
    focusable?: Reference;
    focused?: Reference;
};
export declare const contextId: import("@builder.io/qwik").ContextId<TabsContext>;
export declare const Tabs: import("@builder.io/qwik").Component<TabsProps>;
export {};
//# sourceMappingURL=Tabs.d.ts.map