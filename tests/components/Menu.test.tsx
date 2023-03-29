import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, test } from "vitest";

import { Menu, MenuButton, MenuItem, MenuItemList } from "~/components/Menu";

const page = [
  { id: 1, name: "Actualité", available: true, href: "/actualites" },
  { id: 2, name: "Accessibilite", available: true, href: "/accessibilite" },
  { id: 3, name: "Présentation", available: true, href: "/presentation" },
  { id: 4, name: "Services", available: true, href: "/services" },
  { id: 5, name: "Témoignages", available: true, href: "/temoignages" },
  { id: 6, name: "Contact", available: true, href: "/contact" },
  { id: 7, name: "Connexion", available: true, href: "/profile" },
];

describe("Default state", () => {
  test("MenuItemList is hidden by default", async () => {
    const { render, screen } = await createDOM();

    await render(
      <Menu>
        <MenuButton>click me (3)</MenuButton>

        <MenuItemList styles="flex">
          {page.map((page) => (
            <MenuItem
              key={page.id}
              styles="rounded-md  px-3 py-2 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white"
            >
              <a href={page.href}>{page.name}</a>
            </MenuItem>
          ))}
        </MenuItemList>
      </Menu>
    );
  });
});
