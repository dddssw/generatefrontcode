"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_tsx_1 = require("@/App.tsx");
var root = document.getElementById("root");
if (root) {
    (0, client_1.createRoot)(root).render(<App_tsx_1.default />);
}
