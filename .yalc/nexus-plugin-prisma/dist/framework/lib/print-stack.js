"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printStack = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs-jetpack"));
const stackTraceParser = __importStar(require("stacktrace-parser"));
const highlight_ts_1 = require("./highlight-ts");
function renderN(n, max) {
    const wantedLetters = String(max).length;
    const hasLetters = String(n).length;
    if (hasLetters >= wantedLetters) {
        return String(n);
    }
    return String(' '.repeat(wantedLetters - hasLetters) + n);
}
exports.printStack = ({ callsite }) => {
    const lastErrorHeight = 20;
    let fileLineNumber = ':';
    let prevLines = '\n';
    let afterLines = '';
    let indentValue = 0;
    // @ts-ignore
    if (callsite && typeof window === 'undefined') {
        const stack = stackTraceParser.parse(callsite);
        // TODO: more resilient logic to find the right trace
        // TODO: should not have hard-coded knowledge of prisma here
        const trace = stack.find((t) => t.file && !t.file.includes('nexus-plugin-prisma/src/'));
        if (process.env.NODE_ENV !== 'production' && trace && trace.file && trace.lineNumber && trace.column) {
            const fileName = trace.file;
            const lineNumber = trace.lineNumber;
            fileLineNumber = callsite
                ? `${chalk_1.default.underline(`${trace.file}:${trace.lineNumber}:${trace.column}`)}`
                : '';
            if (fs.exists(fileName)) {
                const file = fs.read(fileName);
                const splitFile = file.split('\n');
                const start = Math.max(0, lineNumber - 4);
                const end = Math.min(lineNumber + 3, splitFile.length - 1);
                const lines = splitFile.slice(start, end);
                const theLine = lines[lines.length - 1];
                const highlightedLines = highlight_ts_1.highlightTS(lines.join('\n')).split('\n');
                prevLines =
                    '\n' +
                        highlightedLines
                            .map((l, i) => chalk_1.default.grey(renderN(i + start + 1, lineNumber + start + 1) + ' ') + chalk_1.default.reset() + l)
                            .map((l, i, _arr) => (i === 3 ? `${chalk_1.default.red.bold('→')} ${l}` : chalk_1.default.dim('  ' + l)))
                            .join('\n');
                afterLines = ')';
                indentValue = String(lineNumber + start + 1).length + getIndent(theLine) + 1;
            }
        }
    }
    function getIndent(line) {
        let spaceCount = 0;
        for (let i = 0; i < line.length; i++) {
            if (line.charAt(i) !== ' ') {
                return spaceCount;
            }
            spaceCount++;
        }
        return spaceCount;
    }
    const stackStr = `\n${prevLines}${chalk_1.default.reset()}\n`;
    return {
        indent: indentValue,
        stack: stackStr,
        afterLines,
        lastErrorHeight,
        fileLineNumber,
    };
};
//# sourceMappingURL=print-stack.js.map