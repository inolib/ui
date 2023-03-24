import { type InputHTMLAttributes, type LabelHTMLAttributes, type SpanHTMLAttributes } from "~/types";
type CheckboxProps = {
    content?: {
        host?: {
            attributes?: SpanHTMLAttributes<HTMLSpanElement>;
        };
        input?: {
            attributes?: Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">;
        };
        label?: {
            attributes?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "for">;
            content: string;
        };
    };
    type?: "default" | "mixed";
};
export declare const Checkbox: import("@builder.io/qwik").Component<CheckboxProps>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map