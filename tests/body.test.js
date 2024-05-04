import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


test(
    "set the body of the JavaScript source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector(originalSourceCode);

        expect(injector.toString()).toBe(originalSourceCode);
    }
);
