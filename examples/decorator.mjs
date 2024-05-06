import { readFileSync } from 'fs';


import JavaScriptInjector from "../JavaScriptInjector.mjs";


const originalSourceCode = `console.log("Hello, world!");`;

let sourceCode = originalSourceCode;

let decorator = readFileSync(
    "examples/decorators/hello-world.mjs",
    'utf-8'
);

const injector = new JavaScriptInjector();

injector.addDecorator(decorator);

const patchedSourceCode = sourceCode = injector.inject(sourceCode);

console.log(patchedSourceCode);
console.log();

injector.eval(originalSourceCode);
