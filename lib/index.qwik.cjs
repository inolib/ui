"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const useComposite = (store) => {
  const focus$ = /* @__PURE__ */ qwik.inlinedQrl((ref) => {
    var _a;
    const [store2] = qwik.useLexicalScope();
    store2.focusable = ref;
    (_a = ref.value) == null ? void 0 : _a.focus();
  }, "useComposite_focus_Ee0OrnQbGKQ", [
    store
  ]);
  const moveFocus$ = /* @__PURE__ */ qwik.inlinedQrl(async (to) => {
    const [focus$2, store2] = qwik.useLexicalScope();
    const predicate = (to2) => {
      switch (to2) {
        case "first:checked":
        case "last:checked":
          return (ref) => {
            const element = ref.value;
            if (element.tagName === "INPUT") {
              if (element.type === "checkbox" || element.type === "radio")
                return element.checked;
            }
            return element.ariaChecked === "true";
          };
        case "first:pressed":
        case "last:pressed":
          return (ref) => {
            var _a;
            return ((_a = ref.value) == null ? void 0 : _a.ariaPressed) === "true";
          };
        case "first:selected":
        case "last:selected":
          return (ref) => {
            var _a;
            return ((_a = ref.value) == null ? void 0 : _a.ariaSelected) === "true";
          };
      }
      return () => false;
    };
    switch (to) {
      case "first":
        await focus$2(store2.navigables[0]);
        break;
      case "first:checked":
      case "first:pressed":
      case "first:selected":
        await focus$2(store2.navigables.find(predicate(to)) ?? store2.navigables[0]);
        break;
      case "last":
        await focus$2(store2.navigables[store2.navigables.length - 1]);
        break;
      case "last:checked":
      case "last:pressed":
      case "last:selected":
        await focus$2(store2.navigables.findLast(predicate(to)) ?? store2.navigables[store2.navigables.length - 1]);
        break;
      case "next": {
        const index = store2.navigables.indexOf(store2.focusable);
        if (0 <= index && index <= store2.navigables.length - 2)
          await focus$2(store2.navigables[index + 1]);
        break;
      }
      case "previous": {
        const index = store2.navigables.lastIndexOf(store2.focusable);
        if (index >= 1)
          await focus$2(store2.navigables[index - 1]);
        break;
      }
    }
  }, "useComposite_moveFocus_DjWeyU2pe0k", [
    focus$,
    store
  ]);
  return {
    focus$,
    moveFocus$
  };
};
const useExpandable = (store) => {
  const collapse$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [store2] = qwik.useLexicalScope();
    store2.expanded = false;
  }, "useExpandable_collapse_qlwpus32Wbw", [
    store
  ]);
  const expand$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [store2] = qwik.useLexicalScope();
    store2.expanded = true;
  }, "useExpandable_expand_E943Ry6sAUU", [
    store
  ]);
  return {
    collapse$,
    expand$
  };
};
const MenuContext = qwik.createContextId("inolib/ui/contexts/Menu");
const Menu = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const store = qwik.useStore({
    activated: [],
    controls: "",
    expanded: false,
    focusable: qwik.useSignal(),
    navigables: [],
    trigger: qwik.useSignal()
  }, {
    deep: true
  });
  const expandable = useExpandable(store);
  const composite = useComposite(store);
  qwik.useContextProvider(MenuContext, store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2, store2] = qwik.useLexicalScope();
    switch (e.code) {
      case "Escape":
        await expandable2.collapse$();
        await composite2.focus$(store2.trigger);
        break;
    }
  }, "Menu_component_useOn_uErTZyUXYRA", [
    composite,
    expandable,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("div", {
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, null, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "LN_0"), 0, "LN_1");
}, "Menu_component_3Ne0Ocgg3ZU"));
const MenuButton = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const ref = qwik.useSignal();
  const store = qwik.useContext(MenuContext);
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2] = qwik.useLexicalScope();
    switch (e.code) {
      case "Space":
        await expandable2.expand$();
        await composite2.moveFocus$("first:selected");
        break;
    }
  }, "MenuButton_component_useOn_a9lEB9IDVlE", [
    composite,
    expandable
  ]));
  qwik.useOn("click", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2, ref2, store2] = qwik.useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await expandable2.collapse$();
        await composite2.focus$(ref2);
      } else {
        await expandable2.expand$();
        await composite2.moveFocus$("first");
      }
    }
  }, "MenuButton_component_useOn_1_AKXmYfuUmis", [
    composite,
    expandable,
    ref,
    store
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [ref2, store2] = qwik.useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "MenuButton_component_useTask_W0ZJt39DFc8", [
    ref,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("button", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-controls": qwik._fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-expanded": qwik._fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    role: "menu",
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1"),
    type: "button"
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "RP_0"), 0, "RP_1");
}, "MenuButton_component_M9yWhyAuPBM"));
const MenuItem = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const ref = qwik.useSignal();
  const store = qwik.useContext(MenuContext);
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [ref2, store2] = qwik.useLexicalScope();
    store2.navigables.push(ref2);
  }, "MenuItem_component_useTask_99AKyf6RgVI", [
    ref,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("li", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    role: "item",
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "OT_0"), 0, "OT_1");
}, "MenuItem_component_nC7Gp0YL3CE"));
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
const MenuItemList = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const store = qwik.useContext(MenuContext);
  const id = nanoid();
  const composite = useComposite(store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2] = qwik.useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
        await composite2.moveFocus$("next");
        break;
      case "ArrowUp":
        await composite2.moveFocus$("previous");
        break;
      case "End":
        await composite2.moveFocus$("last");
        break;
      case "Home":
        await composite2.moveFocus$("first");
        break;
    }
  }, "MenuItemList_component_useOn_soOmOrpOoWU", [
    composite
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [id2, store2] = qwik.useLexicalScope();
    store2.controls = id2;
  }, "MenuItemList_component_useTask_YWtAMzGK5Eo", [
    id,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("ul", {
    id,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    hidden: qwik._fnSignal((p0) => !p0.expanded, [
      store
    ], "!p0.expanded")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "cH_0"), 0, "cH_1");
}, "MenuItemList_component_FjnHFZUe04w"));
exports.Menu = Menu;
exports.MenuButton = MenuButton;
exports.MenuItem = MenuItem;
exports.MenuItemList = MenuItemList;
