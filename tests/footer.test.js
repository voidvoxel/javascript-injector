import JavaScriptInjector from "../JavaScriptInjector.mjs";


test(
    "add a footer to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const footer = `brain = Zerda.require('brain.js');`;

        injector.addFooter(footer);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode).toBe(originalSourceCode + footer);
    }
);


test(
    "add multiple footers to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const footers = [
            `Corestore = Zerda.require('corestore')`,
            `Hyperdrive = Zerda.require('hyperdrive')`
        ];

        injector.addFooter(footers);

        const patchedSourceCode = injector.inject(originalSourceCode);
        const expectedSourceCode = originalSourceCode + footers.join(';');

        expect(patchedSourceCode).toBe(expectedSourceCode);
    }
);
