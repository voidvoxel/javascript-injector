import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


test(
    "set the body of the JavaScript source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        expect(injector.inject(originalSourceCode)).toBe(originalSourceCode);
    }
);
