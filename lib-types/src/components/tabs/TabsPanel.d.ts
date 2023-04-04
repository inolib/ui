import { type TabAttributes } from "~/components/tabs/Tabs";
import type { Reference } from "~/types";
type TabsPanelProps = {
    id: string;
};
export type TabsPanelStore = {
    readonly ref: Reference;
    tab?: TabAttributes | undefined;
};
export declare const TabsPanel: import("@builder.io/qwik").Component<TabsPanelProps>;
export {};
//# sourceMappingURL=TabsPanel.d.ts.map