import { Signal } from "@builder.io/qwik";

export type JSON =
  | string
  | number
  | boolean
  | JSON[]
  | {
      [property: string]: JSON;
    }
  | null;

export type Reference = Signal<HTMLElement | undefined>;
