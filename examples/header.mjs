import { readFileSync } from 'fs';


import JavaScriptInjector from "../JavaScriptInjector.mjs";


const originalSourceCode = `console.log("Hello, world!");`;

let sourceCode = originalSourceCode;

let component = readFileSync(
    "examples/components/hello-world.mjs",
    'utf-8'
);

const injector = new JavaScriptInjector();

injector.addHeader(component);

const patchedSourceCode = sourceCode = injector.inject(sourceCode);

console.log(patchedSourceCode);
console.log();

injector.eval(originalSourceCode);
