import { createContextId, componentQrl, inlinedQrl, useStore, useContextProvider, _jsxQ, _jsxC, Slot, useContext, useOn, useLexicalScope, _fnSignal } from "@builder.io/qwik";
const TestContext = createContextId("inolib/ui/contexts/Test");
const TestMenu = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  const context = {
    TestMenu: useStore({
      hidden: true,
      expended: false
    }, {
      deep: true
    })
  };
  useContextProvider(TestContext, context);
  return /* @__PURE__ */ _jsxQ("div", null, null, /* @__PURE__ */ _jsxC(Slot, null, 3, "u7_0"), 1, "u7_1");
}, "TestMenu_component_0q8fiwGFuXc"));
const TestMenuButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  const context = useContext(TestContext);
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      context2.TestMenu.hidden = !context2.TestMenu.hidden;
      context2.TestMenu.expended = !context2.TestMenu.expended;
    }
  }, "TestMenuButton_component_useOn_fMQkUpdcPr8", [
    context
  ]));
  console.log("expended :", context.TestMenu.expended);
  return /* @__PURE__ */ _jsxQ("button", null, {
    "aria-expanded": _fnSignal((p0) => p0.TestMenu.expended, [
      context
    ], "p0.TestMenu.expended")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "65_0"), 1, "65_1");
}, "TestMenuButton_component_qSTPC41luRg"));
const TestMenuItem = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(TestContext);
  console.log("hidden :", context.TestMenu.hidden);
  return /* @__PURE__ */ _jsxQ("li", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    hidden: _fnSignal((p0) => p0.TestMenu.hidden, [
      context
    ], "p0.TestMenu.hidden")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "wu_0"), 1, "wu_1");
}, "TestMenuItem_component_jnftM0r76So"));
export {
  TestMenu,
  TestMenuButton,
  TestMenuItem
};
