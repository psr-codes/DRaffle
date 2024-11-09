"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/defer-to-connect";
exports.ids = ["vendor-chunks/defer-to-connect"];
exports.modules = {

/***/ "(ssr)/./node_modules/defer-to-connect/dist/source/index.js":
/*!************************************************************!*\
  !*** ./node_modules/defer-to-connect/dist/source/index.js ***!
  \************************************************************/
/***/ ((module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction isTLSSocket(socket) {\n    return socket.encrypted;\n}\nconst deferToConnect = (socket, fn) => {\n    let listeners;\n    if (typeof fn === 'function') {\n        const connect = fn;\n        listeners = { connect };\n    }\n    else {\n        listeners = fn;\n    }\n    const hasConnectListener = typeof listeners.connect === 'function';\n    const hasSecureConnectListener = typeof listeners.secureConnect === 'function';\n    const hasCloseListener = typeof listeners.close === 'function';\n    const onConnect = () => {\n        if (hasConnectListener) {\n            listeners.connect();\n        }\n        if (isTLSSocket(socket) && hasSecureConnectListener) {\n            if (socket.authorized) {\n                listeners.secureConnect();\n            }\n            else if (!socket.authorizationError) {\n                socket.once('secureConnect', listeners.secureConnect);\n            }\n        }\n        if (hasCloseListener) {\n            socket.once('close', listeners.close);\n        }\n    };\n    if (socket.writable && !socket.connecting) {\n        onConnect();\n    }\n    else if (socket.connecting) {\n        socket.once('connect', onConnect);\n    }\n    else if (socket.destroyed && hasCloseListener) {\n        listeners.close(socket._hadError);\n    }\n};\nexports[\"default\"] = deferToConnect;\n// For CommonJS default export support\nmodule.exports = deferToConnect;\nmodule.exports[\"default\"] = deferToConnect;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVmZXItdG8tY29ubmVjdC9kaXN0L3NvdXJjZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTtBQUNmO0FBQ0E7QUFDQSx5QkFBc0IiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcUHJha2FzaCBTaW5naCBSYXdhdFxcRG9jdW1lbnRzXFxwcm9ncmFtbWVzXFxjb2RpbmdcXGhhY2thdGhvbnNcXDIwMjRcXGRhcHBhdGhvblxcY2xpZW50XFxub2RlX21vZHVsZXNcXGRlZmVyLXRvLWNvbm5lY3RcXGRpc3RcXHNvdXJjZVxcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpc1RMU1NvY2tldChzb2NrZXQpIHtcbiAgICByZXR1cm4gc29ja2V0LmVuY3J5cHRlZDtcbn1cbmNvbnN0IGRlZmVyVG9Db25uZWN0ID0gKHNvY2tldCwgZm4pID0+IHtcbiAgICBsZXQgbGlzdGVuZXJzO1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgY29ubmVjdCA9IGZuO1xuICAgICAgICBsaXN0ZW5lcnMgPSB7IGNvbm5lY3QgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxpc3RlbmVycyA9IGZuO1xuICAgIH1cbiAgICBjb25zdCBoYXNDb25uZWN0TGlzdGVuZXIgPSB0eXBlb2YgbGlzdGVuZXJzLmNvbm5lY3QgPT09ICdmdW5jdGlvbic7XG4gICAgY29uc3QgaGFzU2VjdXJlQ29ubmVjdExpc3RlbmVyID0gdHlwZW9mIGxpc3RlbmVycy5zZWN1cmVDb25uZWN0ID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IGhhc0Nsb3NlTGlzdGVuZXIgPSB0eXBlb2YgbGlzdGVuZXJzLmNsb3NlID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IG9uQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGhhc0Nvbm5lY3RMaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNUTFNTb2NrZXQoc29ja2V0KSAmJiBoYXNTZWN1cmVDb25uZWN0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYXV0aG9yaXplZCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zZWN1cmVDb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc29ja2V0LmF1dGhvcml6YXRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgIHNvY2tldC5vbmNlKCdzZWN1cmVDb25uZWN0JywgbGlzdGVuZXJzLnNlY3VyZUNvbm5lY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNDbG9zZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBzb2NrZXQub25jZSgnY2xvc2UnLCBsaXN0ZW5lcnMuY2xvc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoc29ja2V0LndyaXRhYmxlICYmICFzb2NrZXQuY29ubmVjdGluZykge1xuICAgICAgICBvbkNvbm5lY3QoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc29ja2V0LmNvbm5lY3RpbmcpIHtcbiAgICAgICAgc29ja2V0Lm9uY2UoJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzb2NrZXQuZGVzdHJveWVkICYmIGhhc0Nsb3NlTGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXJzLmNsb3NlKHNvY2tldC5faGFkRXJyb3IpO1xuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWZlclRvQ29ubmVjdDtcbi8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5tb2R1bGUuZXhwb3J0cyA9IGRlZmVyVG9Db25uZWN0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGRlZmVyVG9Db25uZWN0O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/defer-to-connect/dist/source/index.js\n");

/***/ })

};
;