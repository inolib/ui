"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const TestContext = qwik.createContextId("inolib/ui/contexts/Test");
const TestMenu = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  const context = {
    TestMenu: qwik.useStore({
      hidden: true,
      expended: false
    }, {
      deep: true
    })
  };
  qwik.useContextProvider(TestContext, context);
  return /* @__PURE__ */ qwik._jsxQ("div", null, null, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "u7_0"), 1, "u7_1");
}, "TestMenu_component_0q8fiwGFuXc"));
const TestMenuButton = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  const context = qwik.useContext(TestContext);
  qwik.useOn("click", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [context2] = qwik.useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      context2.TestMenu.hidden = !context2.TestMenu.hidden;
      context2.TestMenu.expended = !context2.TestMenu.expended;
    }
  }, "TestMenuButton_component_useOn_fMQkUpdcPr8", [
    context
  ]));
  console.log("expended :", context.TestMenu.expended);
  return /* @__PURE__ */ qwik._jsxQ("button", null, {
    "aria-expanded": qwik._fnSignal((p0) => p0.TestMenu.expended, [
      context
    ], "p0.TestMenu.expended")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "65_0"), 1, "65_1");
}, "TestMenuButton_component_qSTPC41luRg"));
const TestMenuItem = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const context = qwik.useContext(TestContext);
  console.log("hidden :", context.TestMenu.hidden);
  return /* @__PURE__ */ qwik._jsxQ("li", null, {
    class: qwik._fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    hidden: qwik._fnSignal((p0) => p0.TestMenu.hidden, [
      context
    ], "p0.TestMenu.hidden")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "wu_0"), 1, "wu_1");
}, "TestMenuItem_component_jnftM0r76So"));
exports.TestMenu = TestMenu;
exports.TestMenuButton = TestMenuButton;
exports.TestMenuItem = TestMenuItem;
