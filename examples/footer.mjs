import { readFileSync } from 'fs';


import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


const originalSourceCode = `console.log("Hello, world!");`;

let sourceCode = originalSourceCode;

let component = readFileSync(
    "examples/components/hello-world.mjs",
    'utf-8'
);

const injector = new JavaScriptInjector(sourceCode);

injector.addFooter(component);

const patchedSourceCode = sourceCode = injector.toString();

console.log(patchedSourceCode);
console.log();

injector.eval();
