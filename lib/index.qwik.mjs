import { useVisibleTaskQrl, inlinedQrl, useLexicalScope, useOn, createContextId, componentQrl, useStore, useContextProvider, _jsxQ, _fnSignal, _jsxC, Slot, useContext, useSignal, useTaskQrl, _jsxBranch } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Fragment } from "@builder.io/qwik/jsx-runtime";
const useFocus = (store) => {
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(({ track }) => {
    const [store2] = useLexicalScope();
    const element = track(() => {
      var _a;
      return (_a = store2.focused) == null ? void 0 : _a.value;
    });
    element == null ? void 0 : element.focus();
  }, "useFocus_useVisibleTask_mgNtDf20JdU", [
    store
  ]), {
    strategy: "document-ready"
  });
};
const tabQrl = /* @__PURE__ */ inlinedQrl((to) => {
  const focused = document.activeElement;
  const tabbables = Array.from(document.querySelectorAll("a[href], area[href], audio[controls], button, form, iframe, input:not([type='hidden']), object, select, summary, textarea, video[controls], [contenteditable], [tabindex]")).filter((element) => {
    let disabled = false;
    switch (element.tagName) {
      case "BUTTON":
        disabled = element.disabled;
        break;
      case "INPUT":
        disabled = element.disabled;
        break;
      case "SELECT":
        disabled = element.disabled;
        break;
      case "TEXTAREA":
        disabled = element.disabled;
        break;
    }
    const focusable = element.tabIndex > -1;
    const visible = element.getClientRects().length > 0;
    return !disabled && focusable && visible;
  });
  const index = tabbables.findIndex((element) => element === focused);
  switch (to) {
    case "next":
      if (index > -1 && index < tabbables.length - 1)
        tabbables[index + 1].focus();
      break;
    case "previous":
      if (index > 0)
        tabbables[index - 1].focus();
      break;
  }
}, "tabQrl_MTUIT5ZHJ9E");
const useTab = () => {
  useOn("keydown", /* @__PURE__ */ inlinedQrl(async (e) => {
    switch (e.code) {
      case "Tab":
        await tabQrl(!e.shiftKey ? "next" : "previous");
        break;
    }
  }, "useTab_useOn_U50H3qhJ3vM"));
};
const collapseQrl$1 = /* @__PURE__ */ inlinedQrl((context) => {
  if (context.MenuButton !== void 0)
    context.MenuButton.expanded = false;
}, "collapseQrl_oAPViqmj2ec");
const expandQrl$1 = /* @__PURE__ */ inlinedQrl((context) => {
  if (context.MenuButton !== void 0)
    context.MenuButton.expanded = true;
}, "expandQrl_ssqxEGiR9m4");
const focusQrl$2 = /* @__PURE__ */ inlinedQrl((context, ref) => {
  context.Menu.focusable = ref;
  context.Menu.focused = ref;
}, "focusQrl_0ckboHMADCg");
const moveFocusQrl$2 = /* @__PURE__ */ inlinedQrl(async (context, to) => {
  const predicate = (to2) => {
    switch (to2) {
      case "first:selected":
      case "last:selected":
        return (item) => item.selected;
      case "next":
      case "previous":
        return (item) => item.ref === context.Menu.focusable;
    }
    return () => false;
  };
  if (context.MenuItemLink !== void 0)
    switch (to) {
      case "first":
        if (context.MenuItemLink.length > 0)
          await focusQrl$2(context, context.MenuItemLink[0].ref);
        break;
      case "first:selected": {
        const item = context.MenuItemLink.find(predicate(to));
        if (item !== void 0)
          await focusQrl$2(context, item.ref);
        else
          await moveFocusQrl$2(context, "first");
        break;
      }
      case "last":
        if (context.MenuItemLink.length > 0)
          await focusQrl$2(context, context.MenuItemLink[context.MenuItemLink.length - 1].ref);
        break;
      case "last:selected": {
        const item = context.MenuItemLink.findLast(predicate(to));
        if (item !== void 0)
          await focusQrl$2(context, item.ref);
        else
          await moveFocusQrl$2(context, "last");
        break;
      }
      case "next": {
        const index = context.MenuItemLink.findIndex(predicate(to));
        if (index > -1 && index < context.MenuItemLink.length - 1)
          await focusQrl$2(context, context.MenuItemLink[index + 1].ref);
        break;
      }
      case "previous": {
        const index = context.MenuItemLink.findLastIndex(predicate(to));
        if (index > 0)
          await focusQrl$2(context, context.MenuItemLink[index - 1].ref);
        break;
      }
    }
}, "moveFocusQrl_G0yrnehKJrw");
const contextId$2 = createContextId("inolib/ui/contexts/Menu");
const Menu = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const store = useStore({}, {
    deep: true
  });
  const context = {
    Menu: store
  };
  useContextProvider(contextId$2, context);
  useFocus(store);
  useTab();
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "Escape":
        if (context2.MenuButton !== void 0) {
          await collapseQrl$1(context2);
          await focusQrl$2(context2, context2.MenuButton.ref);
        }
        break;
    }
  }, "Menu_component_useOn_uucZCtXaOrY", [
    context
  ]));
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:keydown": true,
    "preventdefault:keyup": true
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0h_0"), 1, "0h_1");
}, "Menu_component_ajITlLzP8ME"));
const MenuButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId$2);
  const store = useStore({
    expanded: false,
    ref: useSignal()
  }, {
    deep: true
  });
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case "Space":
        await expandQrl$1(context2);
        await moveFocusQrl$2(context2, e.code !== "ArrowUp" ? "first:selected" : "last:selected");
        break;
    }
  }, "MenuButton_component_useOn_Urbui26fgt0", [
    context
  ]));
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2, store2] = useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await collapseQrl$1(context2);
        await focusQrl$2(context2, store2.ref);
      } else {
        await expandQrl$1(context2);
        await moveFocusQrl$2(context2, "first:selected");
      }
    }
  }, "MenuButton_component_useOn_1_mtvEl1M3CQ8", [
    context,
    store
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.MenuButton = store2;
    context2.Menu.focusable = store2.ref;
  }, "MenuButton_component_useTask_qgqfJoVJoPY", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (context2.MenuItems !== void 0)
      store2.controls = context2.MenuItems.id;
  }, "MenuButton_component_useVisibleTask_g1EKeR6AMwo", [
    context,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("button", {
    ref: store.ref
  }, {
    "aria-controls": _fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-expanded": _fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    "aria-haspopup": "menu",
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:click": true,
    "preventdefault:keydown": true,
    "preventdefault:keyup": true,
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Menu.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Menu.focusable?0:-1"),
    type: "button"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0j_0"), 1, "0j_1");
}, "MenuButton_component_jSOt8NlQDyM"));
const MenuItemLink = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId$2);
  const store = useStore({
    ref: useSignal(),
    selected: useLocation().url.pathname === (props.href.endsWith("/") ? props.href : `${props.href}/`)
  }, {
    deep: true
  });
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (context2.MenuItemLink === void 0)
      context2.MenuItemLink = [];
    context2.MenuItemLink.push(store2);
  }, "MenuItemLink_component_useTask_YBdFL0tFDfg", [
    context,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("li", null, {
    role: "presentation"
  }, /* @__PURE__ */ _jsxQ("a", {
    ref: store.ref
  }, {
    "aria-current": _fnSignal((p0) => p0.selected ? "page" : void 0, [
      store
    ], 'p0.selected?"page":undefined'),
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    href: _fnSignal((p0) => p0.href, [
      props
    ], "p0.href"),
    role: "menuitem",
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Menu.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Menu.focusable?0:-1")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "yD_0"), 1, null), 1, "yD_1");
}, "MenuItemLink_component_iMarlITCNCI"));
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
const MenuItems = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  var _a;
  _jsxBranch();
  const context = useContext(contextId$2);
  const store = useStore({
    id: nanoid()
  }, {
    deep: true
  });
  useOn("keydown", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
        await moveFocusQrl$2(context2, "next");
        break;
      case "ArrowUp":
        await moveFocusQrl$2(context2, "previous");
        break;
    }
  }, "MenuItems_component_useOn_Ou9g00ZAi2I", [
    context
  ]));
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "End":
        await moveFocusQrl$2(context2, "last");
        break;
      case "Home":
        await moveFocusQrl$2(context2, "first");
        break;
    }
  }, "MenuItems_component_useOn_1_5bOrOEvkqaE", [
    context
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.MenuItems = store2;
  }, "MenuItems_component_useTask_muTAzbb4LJk", [
    context,
    store
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: ((_a = context.MenuButton) == null ? void 0 : _a.expanded) ? /* @__PURE__ */ _jsxQ("ul", null, {
      class: _fnSignal((p0) => p0.styles, [
        props
      ], "p0.styles"),
      id: _fnSignal((p0) => p0.id, [
        store
      ], "p0.id"),
      "preventdefault:keydown": true,
      "preventdefault:keyup": true,
      role: "menu"
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "Bd_0"), 1, "Bd_1") : null
  }, 1, "Bd_2");
}, "MenuItems_component_GCrXcIoEM8M"));
const collapseQrl = /* @__PURE__ */ inlinedQrl((context) => {
  if (context.SelectButton !== void 0)
    context.SelectButton.expanded = false;
}, "collapseQrl_0ZHAUowNJnQ");
const expandQrl = /* @__PURE__ */ inlinedQrl((context) => {
  if (context.SelectButton !== void 0)
    context.SelectButton.expanded = true;
}, "expandQrl_C4DHivpaOXA");
const focusQrl$1 = /* @__PURE__ */ inlinedQrl((context, ref) => {
  context.Select.focusable = ref;
  context.Select.focused = ref;
}, "focusQrl_u6pvDtU0gts");
const moveFocusQrl$1 = /* @__PURE__ */ inlinedQrl(async (context, to) => {
  const predicate = (to2) => {
    switch (to2) {
      case "first:selected":
      case "last:selected":
        return (option) => option.selected;
      case "next":
      case "previous":
        return (option) => option.ref === context.Select.focusable;
    }
    return () => false;
  };
  if (context.SelectOption !== void 0) {
    const _SelectOption = context.SelectOption.filter((option) => !option.disabled);
    switch (to) {
      case "first":
        if (_SelectOption.length > 0)
          await focusQrl$1(context, _SelectOption[0].ref);
        break;
      case "first:selected": {
        const option = _SelectOption.find(predicate(to));
        if (option !== void 0)
          await focusQrl$1(context, option.ref);
        else
          await moveFocusQrl$1(context, "first");
        break;
      }
      case "last":
        if (_SelectOption.length > 0)
          await focusQrl$1(context, _SelectOption[_SelectOption.length - 1].ref);
        break;
      case "last:selected": {
        const option = _SelectOption.findLast(predicate(to));
        if (option !== void 0)
          await focusQrl$1(context, option.ref);
        else
          await moveFocusQrl$1(context, "last");
        break;
      }
      case "next": {
        const index = _SelectOption.findIndex(predicate(to));
        if (index > -1 && index < _SelectOption.length - 1)
          await focusQrl$1(context, _SelectOption[index + 1].ref);
        break;
      }
      case "previous": {
        const index = _SelectOption.findLastIndex(predicate(to));
        if (index > 0)
          await focusQrl$1(context, _SelectOption[index - 1].ref);
        break;
      }
    }
  }
}, "moveFocusQrl_ElruCJYXHAY");
const contextId$1 = createContextId("inolib/ui/contexts/Select");
const Select = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const store = useStore({
    disabled: props.disabled ?? false,
    multiple: props.multiple ?? false,
    readonly: props.readonly ?? false,
    value: {
      raw: props.multiple ?? false ? [] : void 0
    }
  }, {
    deep: true
  });
  const context = {
    Select: store
  };
  useContextProvider(contextId$1, context);
  useFocus(store);
  useTab();
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "Escape":
        if (context2.SelectButton !== void 0) {
          await collapseQrl(context2);
          await focusQrl$1(context2, context2.SelectButton.ref);
        }
        break;
    }
  }, "Select_component_useOn_JCkfa0Luxik", [
    context
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(async ({ track }) => {
    const [props2, store2] = useLexicalScope();
    store2.value.stringified = track(() => JSON.stringify(store2.value.raw));
    if (props2.onChange$ !== void 0)
      await props2.onChange$(store2.value.stringified);
  }, "Select_component_useVisibleTask_bLDa0iKgmzQ", [
    props,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:keydown": true,
    "preventdefault:keyup": true
  }, [
    /* @__PURE__ */ _jsxC(Slot, null, 3, "RL_0"),
    props.name !== void 0 ? /* @__PURE__ */ _jsxQ("input", null, {
      name: _fnSignal((p0) => p0.name, [
        props
      ], "p0.name"),
      required: _fnSignal((p0) => p0.required ?? false, [
        props
      ], "p0.required??false"),
      type: "hidden",
      value: _fnSignal((p0) => p0.value.stringified, [
        store
      ], "p0.value.stringified")
    }, null, 3, "RL_1") : null
  ], 1, "RL_2");
}, "Select_component_QBRHe7vamhc"));
const SelectButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId$1);
  const store = useStore({
    expanded: false,
    id: nanoid(),
    ref: useSignal()
  }, {
    deep: true
  });
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case "Space":
        await expandQrl(context2);
        await moveFocusQrl$1(context2, e.code !== "ArrowUp" ? "first:selected" : "last:selected");
        break;
    }
  }, "SelectButton_component_useOn_J2f0RNFCGaY", [
    context
  ]));
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2, store2] = useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await collapseQrl(context2);
        await focusQrl$1(context2, store2.ref);
      } else {
        await expandQrl(context2);
        await moveFocusQrl$1(context2, "first:selected");
      }
    }
  }, "SelectButton_component_useOn_1_hIKTR8pZiuA", [
    context,
    store
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.SelectButton = store2;
    context2.Select.focusable = store2.ref;
  }, "SelectButton_component_useTask_iQ8mMjduSMc", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (store2.ref.value !== void 0)
      store2.slot = store2.ref.value.innerHTML;
    if (context2.SelectOptions !== void 0)
      store2.controls = context2.SelectOptions.id;
  }, "SelectButton_component_useVisibleTask_63Nr88LIjIU", [
    context,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("button", {
    ref: store.ref
  }, {
    "aria-controls": _fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-expanded": _fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    "aria-haspopup": "listbox",
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    disabled: _fnSignal((p0) => p0.Select.disabled, [
      context
    ], "p0.Select.disabled"),
    id: _fnSignal((p0) => p0.id, [
      store
    ], "p0.id"),
    "preventdefault:click": true,
    "preventdefault:keydown": true,
    "preventdefault:keyup": true,
    role: "combobox",
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Select.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Select.focusable?0:-1"),
    type: "button"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "1K_0"), 1, "1K_1");
}, "SelectButton_component_C7xPWe0sXuc"));
const SelectLabel = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId$1);
  const store = useStore({}, {
    deep: true
  });
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.SelectLabel = store2;
  }, "SelectLabel_component_useTask_500Ygl2RoA4", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (context2.SelectButton !== void 0)
      store2.for = context2.SelectButton.id;
  }, "SelectLabel_component_useVisibleTask_1fvnhNqZg9w", [
    context,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("label", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    for: _fnSignal((p0) => p0.for, [
      store
    ], "p0.for")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "l7_0"), 1, "l7_1");
}, "SelectLabel_component_M2JovPugB04"));
const SelectOption = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const toggleQrl = /* @__PURE__ */ inlinedQrl(async (context2, store2, selected) => {
    if (!context2.Select.multiple && selected !== false && context2.SelectOption !== void 0) {
      const optionStore = context2.SelectOption.find((store3) => store3.selected);
      if (optionStore !== void 0 && optionStore.ref !== store2.ref)
        optionStore.selected = false;
    }
    store2.selected = selected ?? !store2.selected;
    if (context2.SelectButton !== void 0) {
      if (context2.Select.multiple) {
        if (store2.value !== void 0) {
          const _value = context2.Select.value.raw;
          if (store2.selected)
            _value.push(store2.value);
          else {
            const index = _value.indexOf(store2.value);
            if (index > -1)
              _value.splice(index, 1);
          }
        }
      } else if (context2.SelectButton.ref.value !== void 0) {
        if (store2.selected && store2.ref.value !== void 0) {
          context2.Select.value.raw = store2.value;
          context2.SelectButton.ref.value.innerHTML = store2.ref.value.innerHTML;
        } else if (selected !== false && context2.SelectButton.slot !== void 0) {
          context2.Select.value.raw = void 0;
          context2.SelectButton.ref.value.innerHTML = context2.SelectButton.slot;
        }
      }
    }
    await focusQrl$1(context2, store2.ref);
  }, "SelectOption_component_toggleQrl_8Tjf5js480s");
  const context = useContext(contextId$1);
  const store = useStore({
    disabled: context.Select.disabled || (props.disabled ?? false),
    ref: useSignal(),
    selected: props.selected ?? false,
    value: props.value
  }, {
    deep: true
  });
  if (!store.disabled && !context.Select.readonly) {
    useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
      const [context2, store2, toggleQrl2] = useLexicalScope();
      switch (e.code) {
        case "Space":
          await toggleQrl2(context2, store2);
          break;
      }
    }, "SelectOption_component_useOn_fj0i20VX0WE", [
      context,
      store,
      toggleQrl
    ]));
    useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
      const [context2, store2, toggleQrl2] = useLexicalScope();
      if (e.detail > 0 && e.button === 0)
        await toggleQrl2(context2, store2);
    }, "SelectOption_component_useOn_1_r1vTCEHIAo4", [
      context,
      store,
      toggleQrl
    ]));
  }
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (context2.SelectOption === void 0)
      context2.SelectOption = [];
    context2.SelectOption.push(store2);
  }, "SelectOption_component_useTask_qs3MfPOjssg", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(async () => {
    const [context2, store2, toggleQrl2] = useLexicalScope();
    if (store2.selected)
      await toggleQrl2(context2, store2, true);
  }, "SelectOption_component_useVisibleTask_Xdqx5MugkDw", [
    context,
    store,
    toggleQrl
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("li", {
    ref: store.ref
  }, {
    "aria-disabled": _fnSignal((p0) => p0.disabled, [
      store
    ], "p0.disabled"),
    "aria-selected": _fnSignal((p0) => p0.selected, [
      store
    ], "p0.selected"),
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:click": true,
    "preventdefault:keydown": true,
    "preventdefault:keyup": true,
    role: "option",
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Select.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Select.focusable?0:-1")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "y0_0"), 1, "y0_1");
}, "SelectOption_component_PZZAaBvCHTE"));
const SelectOptions = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  var _a;
  _jsxBranch();
  const context = useContext(contextId$1);
  const store = useStore({
    id: nanoid()
  }, {
    deep: true
  });
  useOn("keydown", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
        await moveFocusQrl$1(context2, "next");
        break;
      case "ArrowUp":
        await moveFocusQrl$1(context2, "previous");
        break;
    }
  }, "SelectOptions_component_useOn_hSetB655huk", [
    context
  ]));
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "End":
        await moveFocusQrl$1(context2, "last");
        break;
      case "Home":
        await moveFocusQrl$1(context2, "first");
        break;
    }
  }, "SelectOptions_component_useOn_1_CTQ4v5xJebQ", [
    context
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.SelectOptions = store2;
  }, "SelectOptions_component_useTask_pvyb0J5gsSY", [
    context,
    store
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: ((_a = context.SelectButton) == null ? void 0 : _a.expanded) ? /* @__PURE__ */ _jsxQ("ul", null, {
      "aria-multiselectable": _fnSignal((p0) => p0.Select.multiple, [
        context
      ], "p0.Select.multiple"),
      class: _fnSignal((p0) => p0.styles, [
        props
      ], "p0.styles"),
      id: _fnSignal((p0) => p0.id, [
        store
      ], "p0.id"),
      "preventdefault:keydown": true,
      "preventdefault:keyup": true,
      role: "listbox"
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "sb_0"), 1, "sb_1") : null
  }, 1, "sb_2");
}, "SelectOptions_component_3AknAAnr1Yk"));
const focusQrl = /* @__PURE__ */ inlinedQrl((context, ref, moveFocus = true) => {
  context.Tabs.focusable = ref;
  if (moveFocus)
    context.Tabs.focused = ref;
}, "focusQrl_Ou3Mxk5ihhg");
const moveFocusQrl = /* @__PURE__ */ inlinedQrl(async (context, to) => {
  const predicate = (tab) => tab.ref === context.Tabs.focusable;
  if (context.TabsTab !== void 0)
    switch (to) {
      case "first":
        if (context.TabsTab.length > 0)
          await focusQrl(context, context.TabsTab[0].ref);
        break;
      case "last":
        if (context.TabsTab.length > 0)
          await focusQrl(context, context.TabsTab[context.TabsTab.length - 1].ref);
        break;
      case "next": {
        const index = context.TabsTab.findIndex(predicate);
        if (index > -1 && index < context.TabsTab.length - 1)
          await focusQrl(context, context.TabsTab[index + 1].ref);
        break;
      }
      case "previous": {
        const index = context.TabsTab.findLastIndex(predicate);
        if (index > 0)
          await focusQrl(context, context.TabsTab[index - 1].ref);
        break;
      }
    }
}, "moveFocusQrl_gpwDrpPIMC0");
const contextId = createContextId("inolib/ui/contexts/Tabs");
const Tabs = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const store = useStore({}, {
    deep: true
  });
  const context = {
    Tabs: store
  };
  useContextProvider(contextId, context);
  useFocus(store);
  useTab();
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:keydown": true,
    "preventdefault:keyup": true
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "mN_0"), 1, "mN_1");
}, "Tabs_component_i4VgKXErsxg"));
const TabsPanel = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  var _a, _b;
  _jsxBranch();
  const context = useContext(contextId);
  const store = useStore({
    id: nanoid(),
    ref: useSignal()
  }, {
    deep: true
  });
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, props2, store2] = useLexicalScope();
    if (context2.TabsPanel === void 0)
      context2.TabsPanel = [];
    context2.TabsPanel.push({
      props: {
        id: props2.id,
        styles: props2.styles
      },
      store: store2
    });
  }, "TabsPanel_component_useTask_o6eMH2eyXYI", [
    context,
    props,
    store
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: ((_b = (_a = context.TabsTab) == null ? void 0 : _a.find((tab) => tab.selected)) == null ? void 0 : _b.controls) === store.id ? /* @__PURE__ */ _jsxQ("div", {
      ref: store.ref
    }, {
      class: _fnSignal((p0) => p0.styles, [
        props
      ], "p0.styles"),
      id: _fnSignal((p0) => p0.id, [
        store
      ], "p0.id"),
      role: "tabpanel"
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "Nm_0"), 1, "Nm_1") : null
  }, 1, "Nm_2");
}, "TabsPanel_component_vztfpbejRLU"));
const TabsPanels = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0Q_0"), 1, "0Q_1");
}, "TabsPanels_component_SuwbSj5R5aA"));
const selectQrl = /* @__PURE__ */ inlinedQrl(async (context, store, moveFocus = true) => {
  var _a;
  const tab = (_a = context.TabsTab) == null ? void 0 : _a.find((tab2) => tab2.selected);
  if (tab !== void 0)
    tab.selected = false;
  store.selected = true;
  await focusQrl(context, store.ref, moveFocus);
}, "selectQrl_UV2HkaJQUaU");
const TabsTab = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId);
  const store = useStore({
    controls: props.controls,
    ref: useSignal(),
    selected: props.selected ?? false
  }, {
    deep: true
  });
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (context2.TabsTab === void 0)
      context2.TabsTab = [];
    context2.TabsTab.push(store2);
  }, "TabsTab_component_useTask_lLBAsh93Dxg", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(async () => {
    var _a;
    const [context2, props2, store2] = useLexicalScope();
    const panel = (_a = context2.TabsPanel) == null ? void 0 : _a.find((panel2) => panel2.props.id === store2.controls);
    if (panel !== void 0)
      store2.controls = panel.store.id;
    if (props2.selected ?? false)
      await selectQrl(context2, store2, false);
  }, "TabsTab_component_useVisibleTask_DUTEKUc0BVI", [
    context,
    props,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("button", {
    ref: store.ref
  }, {
    "aria-controls": _fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-selected": _fnSignal((p0) => p0.selected, [
      store
    ], "p0.selected"),
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:click": true,
    "preventdefault:keydown": true,
    "preventdefault:keyup": true,
    role: "tab",
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Tabs.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Tabs.focusable?0:-1"),
    type: "button",
    onClick$: /* @__PURE__ */ inlinedQrl(async (event) => {
      const [context2, store2] = useLexicalScope();
      if (event.button === 0)
        await selectQrl(context2, store2);
    }, "TabsTab_component_li_button_onClick_9lA2jjaUjoo", [
      context,
      store
    ]),
    onKeyUp$: /* @__PURE__ */ inlinedQrl(async (event) => {
      const [context2, store2] = useLexicalScope();
      switch (event.keyCode) {
        case 13:
        case 32:
          await selectQrl(context2, store2);
          break;
      }
    }, "TabsTab_component_li_button_onKeyUp_hRzGYK7CAQA", [
      context,
      store
    ])
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "ne_0"), 1, null), 1, "ne_1");
}, "TabsTab_component_1JU1CUk5q0Y"));
const TabsTabs = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId);
  useOn("keydown", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowLeft":
        await moveFocusQrl(context2, "previous");
        break;
      case "ArrowRight":
        await moveFocusQrl(context2, "next");
        break;
    }
  }, "TabsTabs_component_useOn_AAh6tQI7Bsk", [
    context
  ]));
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "End":
        await moveFocusQrl(context2, "last");
        break;
      case "Home":
        await moveFocusQrl(context2, "first");
        break;
    }
  }, "TabsTabs_component_useOn_1_zZgfwgrpUTY", [
    context
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: /* @__PURE__ */ _jsxQ("ul", null, {
      class: _fnSignal((p0) => p0.styles, [
        props
      ], "p0.styles"),
      "preventdefault:keydown": true,
      "preventdefault:keyup": true,
      role: "tablist"
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "TW_0"), 1, null)
  }, 1, "TW_1");
}, "TabsTabs_component_tTyA7fGFKN4"));
export {
  Menu,
  MenuButton,
  MenuItemLink,
  MenuItems,
  Select,
  SelectButton,
  SelectLabel,
  SelectOption,
  SelectOptions,
  Tabs,
  TabsPanel,
  TabsPanels,
  TabsTab,
  TabsTabs
};
