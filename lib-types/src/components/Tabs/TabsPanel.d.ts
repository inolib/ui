import type { Reference } from "~/types";
export type TabsPanelProps = {
    readonly id: string;
    readonly styles?: string | undefined;
};
export type TabsPanelStore = {
    readonly id: string;
    readonly ref: Reference;
};
export declare const TabsPanel: import("@builder.io/qwik").Component<TabsPanelProps>;
//# sourceMappingURL=TabsPanel.d.ts.map