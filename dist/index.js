"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = require("styled-components");

var _ReactPerfTool = _interopRequireDefault(require("./components/ReactPerfTool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CSS Reset

/* eslint-disable */
_styledComponents.injectGlobal`
  .perf-tool div, .perf-tool span, .perf-tool h1, .perf-tool h2, .perf-tool h3, .perf-tool h4, .perf-tool h5, .perf-tool h6, .perf-tool p, .perf-tool pre,
  .perf-tool a, .perf-tool code, .perf-tool em, .perf-tool img, .perf-tool small, .perf-tool strike, .perf-tool strong, .perf-tool b, .perf-tool u, .perf-tool i, .perf-tool center,
  .perf-tool ol, .perf-tool ul, .perf-tool li, .perf-tool fieldset, .perf-tool form, .perf-tool label,
  .perf-tool table, .perf-tool tbody, .perf-tool tfoot, .perf-tool thead, .perf-tool tr, .perf-tool th, .perf-tool td,
  .perf-tool article, .perf-tool aside, .perf-tool canvas, .perf-tool figure, .perf-tool figcaption, .perf-tool footer,
  .perf-tool header, .perf-tool nav, .perf-tool section,
  .perf-tool audio, .perf-tool video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'Helvetica', sans-serif;
    font-weight: 300;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  .perf-tool article, .perf-tool aside, .perf-tool details, .perf-tool figcaption, .perf-tool figure,
  .perf-tool footer, .perf-tool header, .perf-tool hgroup, .perf-tool menu, .perf-tool nav, .perf-tool section { display: block; }
  body { line-height: 1; }
  ol, .perf-tool ul { list-style: none; }
  .perf-tool blockquote, .perf-tool q { quotes: none; }
  .perf-tool blockquote:before, .perf-tool blockquote:after,
  .perf-tool q:before, .perf-tool q:after {
    content: '';
    content: none;
  }
  .perf-tool table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
/* eslint-enable */

var _default = _ReactPerfTool.default;
exports.default = _default;