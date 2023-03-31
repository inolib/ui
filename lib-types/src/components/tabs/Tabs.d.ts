export declare const TabsContext: import("@builder.io/qwik").ContextId<Contexts>;
type Contexts = {
    Tabs: TabsStore;
};
type TabsStore = {
    tabs: {
        attributes: {
            id?: string;
            hidden: boolean;
            "aria-expanded": boolean;
            panelId: number;
        }[];
    };
};
export declare const Tabs: import("@builder.io/qwik").Component<{}>;
export {};
//# sourceMappingURL=Tabs.d.ts.map