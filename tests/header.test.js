import JavaScriptInjector from "../JavaScriptInjector.mjs";


test(
    "add a header to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const header = `brain = Zerda.require('brain.js');`;

        injector.addHeader(header);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode).toBe(header + originalSourceCode);
    }
);


test(
    "add multiple headers to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const headers = [
            `Corestore = Zerda.require('corestore')`,
            `Hyperdrive = Zerda.require('hyperdrive')`
        ];

        injector.addHeader(headers);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode).toBe(headers.join(';') + ';' + originalSourceCode);
    }
);
