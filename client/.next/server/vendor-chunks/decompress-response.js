"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/decompress-response";
exports.ids = ["vendor-chunks/decompress-response"];
exports.modules = {

/***/ "(ssr)/./node_modules/decompress-response/index.js":
/*!***************************************************!*\
  !*** ./node_modules/decompress-response/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst {Transform, PassThrough} = __webpack_require__(/*! stream */ \"stream\");\nconst zlib = __webpack_require__(/*! zlib */ \"zlib\");\nconst mimicResponse = __webpack_require__(/*! mimic-response */ \"(ssr)/./node_modules/decompress-response/node_modules/mimic-response/index.js\");\n\nmodule.exports = response => {\n\tconst contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();\n\n\tif (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {\n\t\treturn response;\n\t}\n\n\t// TODO: Remove this when targeting Node.js 12.\n\tconst isBrotli = contentEncoding === 'br';\n\tif (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {\n\t\tresponse.destroy(new Error('Brotli is not supported on Node.js < 12'));\n\t\treturn response;\n\t}\n\n\tlet isEmpty = true;\n\n\tconst checker = new Transform({\n\t\ttransform(data, _encoding, callback) {\n\t\t\tisEmpty = false;\n\n\t\t\tcallback(null, data);\n\t\t},\n\n\t\tflush(callback) {\n\t\t\tcallback();\n\t\t}\n\t});\n\n\tconst finalStream = new PassThrough({\n\t\tautoDestroy: false,\n\t\tdestroy(error, callback) {\n\t\t\tresponse.destroy();\n\n\t\t\tcallback(error);\n\t\t}\n\t});\n\n\tconst decompressStream = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();\n\n\tdecompressStream.once('error', error => {\n\t\tif (isEmpty && !response.readable) {\n\t\t\tfinalStream.end();\n\t\t\treturn;\n\t\t}\n\n\t\tfinalStream.destroy(error);\n\t});\n\n\tmimicResponse(response, finalStream);\n\tresponse.pipe(checker).pipe(decompressStream).pipe(finalStream);\n\n\treturn finalStream;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVjb21wcmVzcy1yZXNwb25zZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLE9BQU8sd0JBQXdCLEVBQUUsbUJBQU8sQ0FBQyxzQkFBUTtBQUNqRCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isc0JBQXNCLG1CQUFPLENBQUMscUdBQWdCOztBQUU5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxQcmFrYXNoIFNpbmdoIFJhd2F0XFxEb2N1bWVudHNcXHByb2dyYW1tZXNcXGNvZGluZ1xcaGFja2F0aG9uc1xcMjAyNFxcZGFwcGF0aG9uXFxjbGllbnRcXG5vZGVfbW9kdWxlc1xcZGVjb21wcmVzcy1yZXNwb25zZVxcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge1RyYW5zZm9ybSwgUGFzc1Rocm91Z2h9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCB6bGliID0gcmVxdWlyZSgnemxpYicpO1xuY29uc3QgbWltaWNSZXNwb25zZSA9IHJlcXVpcmUoJ21pbWljLXJlc3BvbnNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzcG9uc2UgPT4ge1xuXHRjb25zdCBjb250ZW50RW5jb2RpbmcgPSAocmVzcG9uc2UuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmICghWydnemlwJywgJ2RlZmxhdGUnLCAnYnInXS5pbmNsdWRlcyhjb250ZW50RW5jb2RpbmcpKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0Ly8gVE9ETzogUmVtb3ZlIHRoaXMgd2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxMi5cblx0Y29uc3QgaXNCcm90bGkgPSBjb250ZW50RW5jb2RpbmcgPT09ICdicic7XG5cdGlmIChpc0Jyb3RsaSAmJiB0eXBlb2YgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmVzcG9uc2UuZGVzdHJveShuZXcgRXJyb3IoJ0Jyb3RsaSBpcyBub3Qgc3VwcG9ydGVkIG9uIE5vZGUuanMgPCAxMicpKTtcblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRsZXQgaXNFbXB0eSA9IHRydWU7XG5cblx0Y29uc3QgY2hlY2tlciA9IG5ldyBUcmFuc2Zvcm0oe1xuXHRcdHRyYW5zZm9ybShkYXRhLCBfZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG5cdFx0XHRpc0VtcHR5ID0gZmFsc2U7XG5cblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuXHRcdH0sXG5cblx0XHRmbHVzaChjYWxsYmFjaykge1xuXHRcdFx0Y2FsbGJhY2soKTtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IGZpbmFsU3RyZWFtID0gbmV3IFBhc3NUaHJvdWdoKHtcblx0XHRhdXRvRGVzdHJveTogZmFsc2UsXG5cdFx0ZGVzdHJveShlcnJvciwgY2FsbGJhY2spIHtcblx0XHRcdHJlc3BvbnNlLmRlc3Ryb3koKTtcblxuXHRcdFx0Y2FsbGJhY2soZXJyb3IpO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgZGVjb21wcmVzc1N0cmVhbSA9IGlzQnJvdGxpID8gemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzKCkgOiB6bGliLmNyZWF0ZVVuemlwKCk7XG5cblx0ZGVjb21wcmVzc1N0cmVhbS5vbmNlKCdlcnJvcicsIGVycm9yID0+IHtcblx0XHRpZiAoaXNFbXB0eSAmJiAhcmVzcG9uc2UucmVhZGFibGUpIHtcblx0XHRcdGZpbmFsU3RyZWFtLmVuZCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZpbmFsU3RyZWFtLmRlc3Ryb3koZXJyb3IpO1xuXHR9KTtcblxuXHRtaW1pY1Jlc3BvbnNlKHJlc3BvbnNlLCBmaW5hbFN0cmVhbSk7XG5cdHJlc3BvbnNlLnBpcGUoY2hlY2tlcikucGlwZShkZWNvbXByZXNzU3RyZWFtKS5waXBlKGZpbmFsU3RyZWFtKTtcblxuXHRyZXR1cm4gZmluYWxTdHJlYW07XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/decompress-response/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/decompress-response/node_modules/mimic-response/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/decompress-response/node_modules/mimic-response/index.js ***!
  \*******************************************************************************/
/***/ ((module) => {

eval("\n\n// We define these manually to ensure they're always copied\n// even if they would move up the prototype chain\n// https://nodejs.org/api/http.html#http_class_http_incomingmessage\nconst knownProperties = [\n\t'aborted',\n\t'complete',\n\t'headers',\n\t'httpVersion',\n\t'httpVersionMinor',\n\t'httpVersionMajor',\n\t'method',\n\t'rawHeaders',\n\t'rawTrailers',\n\t'setTimeout',\n\t'socket',\n\t'statusCode',\n\t'statusMessage',\n\t'trailers',\n\t'url'\n];\n\nmodule.exports = (fromStream, toStream) => {\n\tif (toStream._readableState.autoDestroy) {\n\t\tthrow new Error('The second stream must have the `autoDestroy` option set to `false`');\n\t}\n\n\tconst fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));\n\n\tconst properties = {};\n\n\tfor (const property of fromProperties) {\n\t\t// Don't overwrite existing properties.\n\t\tif (property in toStream) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tproperties[property] = {\n\t\t\tget() {\n\t\t\t\tconst value = fromStream[property];\n\t\t\t\tconst isFunction = typeof value === 'function';\n\n\t\t\t\treturn isFunction ? value.bind(fromStream) : value;\n\t\t\t},\n\t\t\tset(value) {\n\t\t\t\tfromStream[property] = value;\n\t\t\t},\n\t\t\tenumerable: true,\n\t\t\tconfigurable: false\n\t\t};\n\t}\n\n\tObject.defineProperties(toStream, properties);\n\n\tfromStream.once('aborted', () => {\n\t\ttoStream.destroy();\n\n\t\ttoStream.emit('aborted');\n\t});\n\n\tfromStream.once('close', () => {\n\t\tif (fromStream.complete) {\n\t\t\tif (toStream.readable) {\n\t\t\t\ttoStream.once('end', () => {\n\t\t\t\t\ttoStream.emit('close');\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\ttoStream.emit('close');\n\t\t\t}\n\t\t} else {\n\t\t\ttoStream.emit('close');\n\t\t}\n\t});\n\n\treturn toStream;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVjb21wcmVzcy1yZXNwb25zZS9ub2RlX21vZHVsZXMvbWltaWMtcmVzcG9uc2UvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFByYWthc2ggU2luZ2ggUmF3YXRcXERvY3VtZW50c1xccHJvZ3JhbW1lc1xcY29kaW5nXFxoYWNrYXRob25zXFwyMDI0XFxkYXBwYXRob25cXGNsaWVudFxcbm9kZV9tb2R1bGVzXFxkZWNvbXByZXNzLXJlc3BvbnNlXFxub2RlX21vZHVsZXNcXG1pbWljLXJlc3BvbnNlXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIFdlIGRlZmluZSB0aGVzZSBtYW51YWxseSB0byBlbnN1cmUgdGhleSdyZSBhbHdheXMgY29waWVkXG4vLyBldmVuIGlmIHRoZXkgd291bGQgbW92ZSB1cCB0aGUgcHJvdG90eXBlIGNoYWluXG4vLyBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX2NsYXNzX2h0dHBfaW5jb21pbmdtZXNzYWdlXG5jb25zdCBrbm93blByb3BlcnRpZXMgPSBbXG5cdCdhYm9ydGVkJyxcblx0J2NvbXBsZXRlJyxcblx0J2hlYWRlcnMnLFxuXHQnaHR0cFZlcnNpb24nLFxuXHQnaHR0cFZlcnNpb25NaW5vcicsXG5cdCdodHRwVmVyc2lvbk1ham9yJyxcblx0J21ldGhvZCcsXG5cdCdyYXdIZWFkZXJzJyxcblx0J3Jhd1RyYWlsZXJzJyxcblx0J3NldFRpbWVvdXQnLFxuXHQnc29ja2V0Jyxcblx0J3N0YXR1c0NvZGUnLFxuXHQnc3RhdHVzTWVzc2FnZScsXG5cdCd0cmFpbGVycycsXG5cdCd1cmwnXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmcm9tU3RyZWFtLCB0b1N0cmVhbSkgPT4ge1xuXHRpZiAodG9TdHJlYW0uX3JlYWRhYmxlU3RhdGUuYXV0b0Rlc3Ryb3kpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzZWNvbmQgc3RyZWFtIG11c3QgaGF2ZSB0aGUgYGF1dG9EZXN0cm95YCBvcHRpb24gc2V0IHRvIGBmYWxzZWAnKTtcblx0fVxuXG5cdGNvbnN0IGZyb21Qcm9wZXJ0aWVzID0gbmV3IFNldChPYmplY3Qua2V5cyhmcm9tU3RyZWFtKS5jb25jYXQoa25vd25Qcm9wZXJ0aWVzKSk7XG5cblx0Y29uc3QgcHJvcGVydGllcyA9IHt9O1xuXG5cdGZvciAoY29uc3QgcHJvcGVydHkgb2YgZnJvbVByb3BlcnRpZXMpIHtcblx0XHQvLyBEb24ndCBvdmVyd3JpdGUgZXhpc3RpbmcgcHJvcGVydGllcy5cblx0XHRpZiAocHJvcGVydHkgaW4gdG9TdHJlYW0pIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHByb3BlcnRpZXNbcHJvcGVydHldID0ge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IGZyb21TdHJlYW1bcHJvcGVydHldO1xuXHRcdFx0XHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xuXG5cdFx0XHRcdHJldHVybiBpc0Z1bmN0aW9uID8gdmFsdWUuYmluZChmcm9tU3RyZWFtKSA6IHZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldCh2YWx1ZSkge1xuXHRcdFx0XHRmcm9tU3RyZWFtW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdFx0fTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRvU3RyZWFtLCBwcm9wZXJ0aWVzKTtcblxuXHRmcm9tU3RyZWFtLm9uY2UoJ2Fib3J0ZWQnLCAoKSA9PiB7XG5cdFx0dG9TdHJlYW0uZGVzdHJveSgpO1xuXG5cdFx0dG9TdHJlYW0uZW1pdCgnYWJvcnRlZCcpO1xuXHR9KTtcblxuXHRmcm9tU3RyZWFtLm9uY2UoJ2Nsb3NlJywgKCkgPT4ge1xuXHRcdGlmIChmcm9tU3RyZWFtLmNvbXBsZXRlKSB7XG5cdFx0XHRpZiAodG9TdHJlYW0ucmVhZGFibGUpIHtcblx0XHRcdFx0dG9TdHJlYW0ub25jZSgnZW5kJywgKCkgPT4ge1xuXHRcdFx0XHRcdHRvU3RyZWFtLmVtaXQoJ2Nsb3NlJyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dG9TdHJlYW0uZW1pdCgnY2xvc2UnKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9TdHJlYW0uZW1pdCgnY2xvc2UnKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiB0b1N0cmVhbTtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/decompress-response/node_modules/mimic-response/index.js\n");

/***/ })

};
;