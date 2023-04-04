import type { Reference } from "~/types";
import { TabsItemStore } from "~/components/tabs/TabsItem";
import { TabsListItemStore } from "~/components/tabs/TabsListItem";
import { TabsPanelStore } from "~/components/tabs/TabsPanel";
export declare const focusQrl: import("@builder.io/qwik").QRL<(context: Contexts, ref: Reference) => void>;
export declare const moveFocusQrl: import("@builder.io/qwik").QRL<(context: Contexts, to: string) => Promise<void>>;
type Contexts = {
    Tabs: TabsStore;
    TabsListItem?: TabsListItemStore;
    TabsItem?: TabsItemStore[];
    TabsPanel?: TabsPanelStore[];
    Focus: FocusStore;
};
type FocusStore = {
    focusable?: Reference;
    focused?: Reference;
};
export type TabAttributes = {
    tabId?: string;
    panelId: string;
    hidden: boolean;
    "aria-selected": boolean;
};
type TabsStore = {
    tabs: {
        attributes: TabAttributes[];
    };
};
export declare const TabsContext: import("@builder.io/qwik").ContextId<Contexts>;
export declare const Tabs: import("@builder.io/qwik").Component<{}>;
export {};
//# sourceMappingURL=Tabs.d.ts.map