import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, test } from "vitest";

import { Select, SelectButton, SelectOption, SelectOptionList } from "~/components/Select";

const people = [
  { id: 1, name: "Matthieu MEIGNAN", available: true },
  { id: 2, name: "Quentin FERRARI", available: false },
  { id: 3, name: "Matthieu GEORGE", available: true },
];

describe("Default state", () => {
  test("SelectOptionList is hidden by default", async () => {
    const { render, screen } = await createDOM();

    await render(
      <Select>
        <SelectButton></SelectButton>
        <SelectOptionList>
          {people.map((person) => (
            <SelectOption isDisabled={!person.available} key={person.id} value={person}>
              {person.name}
            </SelectOption>
          ))}
        </SelectOptionList>
      </Select>
    );
  });
});

describe("Disabling elements", () => {
  test("selectButton is disabled", async () => {
    const { render, screen } = await createDOM();

    await render(
      <Select isDisabled={true}>
        <SelectButton></SelectButton>
        <SelectOptionList>
          {people.map((person) => (
            <SelectOption isDisabled={!person.available} key={person.id} value={person}>
              {person.name}
            </SelectOption>
          ))}
        </SelectOptionList>
      </Select>
    );
  });
});

describe("Focus Management", () => {
  test("SelectButton is focusable by default", async () => {
    const { render, screen } = await createDOM();

    await render(
      <Select>
        <SelectButton></SelectButton>
        <SelectOptionList>
          {people.map((person) => (
            <SelectOption isDisabled={!person.available} key={person.id} value={person}>
              {person.name}
            </SelectOption>
          ))}
        </SelectOptionList>
      </Select>
    );
  });
});
