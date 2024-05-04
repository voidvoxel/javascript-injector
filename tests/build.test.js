import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


test(
    "build the modified source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector(originalSourceCode);

        expect(injector.build().toString()).toBe(injector.toString());
    }
);
