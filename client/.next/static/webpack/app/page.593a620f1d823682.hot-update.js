/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/App.jsx":
/*!****************************!*\
  !*** ./components/App.jsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/aptosHelper */ \"(app-pages-browser)/./utils/aptosHelper.js\");\n/* harmony import */ var _utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst LotteryComponent = ()=>{\n    _s();\n    const [ticketPrice, setTicketPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0.01);\n    const [winAmount, setWinAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0.1);\n    const [adminAddress, setAdminAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"0x791bb225d446fad68fb3aab4da12f8d58561f8291765c13b139e5921a68680e7\");\n    const [lotteryInfo, setLotteryInfo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleInitialize = async ()=>{\n        await (0,_utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2__.initializeLottery)(ticketPrice, winAmount);\n    };\n    const handleBuyTicket = async ()=>{\n        await (0,_utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2__.buyTicket)(adminAddress, ticketPrice);\n    };\n    const handleDrawWinner = async ()=>{\n        await (0,_utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2__.drawWinner)();\n    };\n    const handleGetLotteryInfo = async ()=>{\n        const info = await (0,_utils_aptosHelper__WEBPACK_IMPORTED_MODULE_2__.getLotteryInfo)(adminAddress);\n        setLotteryInfo(info);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleInitialize,\n                children: \"Initialize Lottery\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                lineNumber: 37,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleBuyTicket,\n                children: \"Buy Ticket\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                lineNumber: 38,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleDrawWinner,\n                children: \"Draw Winner\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                lineNumber: 39,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleGetLotteryInfo,\n                children: \"Get Lottery Info\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                lineNumber: 40,\n                columnNumber: 13\n            }, undefined),\n            lotteryInfo && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Ticket Price: \",\n                            lotteryInfo.ticket_price\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                        lineNumber: 44,\n                        columnNumber: 21\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Winner Amount: \",\n                            lotteryInfo.win_amount\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                        lineNumber: 45,\n                        columnNumber: 21\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Active: \",\n                            lotteryInfo.is_active ? \"Yes\" : \"No\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                        lineNumber: 46,\n                        columnNumber: 21\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Participants: \",\n                            lotteryInfo.participants.join(\", \")\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                        lineNumber: 47,\n                        columnNumber: 21\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n                lineNumber: 43,\n                columnNumber: 17\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Prakash Singh Rawat\\\\Documents\\\\programmes\\\\coding\\\\hackathons\\\\2024\\\\dappathon\\\\client\\\\components\\\\App.jsx\",\n        lineNumber: 36,\n        columnNumber: 9\n    }, undefined);\n};\n_s(LotteryComponent, \"dX8KC9obCPXX942Os+8Y5jN1Idk=\");\n_c = LotteryComponent;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LotteryComponent);\nvar _c;\n$RefreshReg$(_c, \"LotteryComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvQXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUN3QztBQU1YO0FBRTdCLE1BQU1NLG1CQUFtQjs7SUFDckIsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdQLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ1EsV0FBV0MsYUFBYSxHQUFHVCwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNVLGNBQWNDLGdCQUFnQixHQUFHWCwrQ0FBUUEsQ0FDNUM7SUFFSixNQUFNLENBQUNZLGFBQWFDLGVBQWUsR0FBR2IsK0NBQVFBLENBQUM7SUFFL0MsTUFBTWMsbUJBQW1CO1FBQ3JCLE1BQU1iLHFFQUFpQkEsQ0FBQ0ssYUFBYUU7SUFDekM7SUFFQSxNQUFNTyxrQkFBa0I7UUFDcEIsTUFBTWIsNkRBQVNBLENBQUNRLGNBQWNKO0lBQ2xDO0lBRUEsTUFBTVUsbUJBQW1CO1FBQ3JCLE1BQU1iLDhEQUFVQTtJQUNwQjtJQUVBLE1BQU1jLHVCQUF1QjtRQUN6QixNQUFNQyxPQUFPLE1BQU1kLGtFQUFjQSxDQUFDTTtRQUNsQ0csZUFBZUs7SUFDbkI7SUFFQSxxQkFDSSw4REFBQ0M7OzBCQUNHLDhEQUFDQztnQkFBT0MsU0FBU1A7MEJBQWtCOzs7Ozs7MEJBQ25DLDhEQUFDTTtnQkFBT0MsU0FBU047MEJBQWlCOzs7Ozs7MEJBQ2xDLDhEQUFDSztnQkFBT0MsU0FBU0w7MEJBQWtCOzs7Ozs7MEJBQ25DLDhEQUFDSTtnQkFBT0MsU0FBU0o7MEJBQXNCOzs7Ozs7WUFFdENMLDZCQUNHLDhEQUFDTzs7a0NBQ0csOERBQUNHOzs0QkFBRTs0QkFBZVYsWUFBWVcsWUFBWTs7Ozs7OztrQ0FDMUMsOERBQUNEOzs0QkFBRTs0QkFBZ0JWLFlBQVlZLFVBQVU7Ozs7Ozs7a0NBQ3pDLDhEQUFDRjs7NEJBQUU7NEJBQVNWLFlBQVlhLFNBQVMsR0FBRyxRQUFROzs7Ozs7O2tDQUM1Qyw4REFBQ0g7OzRCQUFFOzRCQUFlVixZQUFZYyxZQUFZLENBQUNDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtwRTtHQTFDTXRCO0tBQUFBO0FBNENOLGlFQUFlQSxnQkFBZ0JBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcUHJha2FzaCBTaW5naCBSYXdhdFxcRG9jdW1lbnRzXFxwcm9ncmFtbWVzXFxjb2RpbmdcXGhhY2thdGhvbnNcXDIwMjRcXGRhcHBhdGhvblxcY2xpZW50XFxjb21wb25lbnRzXFxBcHAuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVMb3R0ZXJ5LFxyXG4gICAgYnV5VGlja2V0LFxyXG4gICAgZHJhd1dpbm5lcixcclxuICAgIGdldExvdHRlcnlJbmZvLFxyXG59IGZyb20gXCJAL3V0aWxzL2FwdG9zSGVscGVyXCI7XHJcblxyXG5jb25zdCBMb3R0ZXJ5Q29tcG9uZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW3RpY2tldFByaWNlLCBzZXRUaWNrZXRQcmljZV0gPSB1c2VTdGF0ZSgwLjAxKTtcclxuICAgIGNvbnN0IFt3aW5BbW91bnQsIHNldFdpbkFtb3VudF0gPSB1c2VTdGF0ZSgwLjEpO1xyXG4gICAgY29uc3QgW2FkbWluQWRkcmVzcywgc2V0QWRtaW5BZGRyZXNzXSA9IHVzZVN0YXRlKFxyXG4gICAgICAgIFwiMHg3OTFiYjIyNWQ0NDZmYWQ2OGZiM2FhYjRkYTEyZjhkNTg1NjFmODI5MTc2NWMxM2IxMzllNTkyMWE2ODY4MGU3XCJcclxuICAgICk7XHJcbiAgICBjb25zdCBbbG90dGVyeUluZm8sIHNldExvdHRlcnlJbmZvXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUluaXRpYWxpemUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgaW5pdGlhbGl6ZUxvdHRlcnkodGlja2V0UHJpY2UsIHdpbkFtb3VudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUJ1eVRpY2tldCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBidXlUaWNrZXQoYWRtaW5BZGRyZXNzLCB0aWNrZXRQcmljZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZURyYXdXaW5uZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgZHJhd1dpbm5lcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVHZXRMb3R0ZXJ5SW5mbyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgZ2V0TG90dGVyeUluZm8oYWRtaW5BZGRyZXNzKTtcclxuICAgICAgICBzZXRMb3R0ZXJ5SW5mbyhpbmZvKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUluaXRpYWxpemV9PkluaXRpYWxpemUgTG90dGVyeTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUJ1eVRpY2tldH0+QnV5IFRpY2tldDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZURyYXdXaW5uZXJ9PkRyYXcgV2lubmVyPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlR2V0TG90dGVyeUluZm99PkdldCBMb3R0ZXJ5IEluZm88L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgIHtsb3R0ZXJ5SW5mbyAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlRpY2tldCBQcmljZToge2xvdHRlcnlJbmZvLnRpY2tldF9wcmljZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+V2lubmVyIEFtb3VudDoge2xvdHRlcnlJbmZvLndpbl9hbW91bnR9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPkFjdGl2ZToge2xvdHRlcnlJbmZvLmlzX2FjdGl2ZSA/IFwiWWVzXCIgOiBcIk5vXCJ9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlBhcnRpY2lwYW50czoge2xvdHRlcnlJbmZvLnBhcnRpY2lwYW50cy5qb2luKFwiLCBcIil9PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG90dGVyeUNvbXBvbmVudDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJpbml0aWFsaXplTG90dGVyeSIsImJ1eVRpY2tldCIsImRyYXdXaW5uZXIiLCJnZXRMb3R0ZXJ5SW5mbyIsIkxvdHRlcnlDb21wb25lbnQiLCJ0aWNrZXRQcmljZSIsInNldFRpY2tldFByaWNlIiwid2luQW1vdW50Iiwic2V0V2luQW1vdW50IiwiYWRtaW5BZGRyZXNzIiwic2V0QWRtaW5BZGRyZXNzIiwibG90dGVyeUluZm8iLCJzZXRMb3R0ZXJ5SW5mbyIsImhhbmRsZUluaXRpYWxpemUiLCJoYW5kbGVCdXlUaWNrZXQiLCJoYW5kbGVEcmF3V2lubmVyIiwiaGFuZGxlR2V0TG90dGVyeUluZm8iLCJpbmZvIiwiZGl2IiwiYnV0dG9uIiwib25DbGljayIsInAiLCJ0aWNrZXRfcHJpY2UiLCJ3aW5fYW1vdW50IiwiaXNfYWN0aXZlIiwicGFydGljaXBhbnRzIiwiam9pbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/App.jsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./utils/aptosHelper.js":
/*!******************************!*\
  !*** ./utils/aptosHelper.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});