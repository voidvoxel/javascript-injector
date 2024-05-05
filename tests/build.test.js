import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


test(
    "build the modified source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        expect(injector.build()(originalSourceCode)).toBe(injector.inject(originalSourceCode));
    }
);
