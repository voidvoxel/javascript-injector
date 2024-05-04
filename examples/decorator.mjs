import { readFileSync } from 'fs';


import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


const originalSourceCode = `console.log("Hello, world!");`;

let sourceCode = originalSourceCode;

let decorator = readFileSync(
    "examples/decorators/hello-world.mjs",
    'utf-8'
);

const injector = new JavaScriptInjector(sourceCode);

injector.addDecorator(decorator);

const patchedSourceCode = sourceCode = injector.toString();

eval(patchedSourceCode);
