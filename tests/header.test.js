import JavaScriptInjector from "../JavaScriptInjector.mjs";


test(
    "add a header to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        function header () {
            globalThis.moment = require('moment');
        }

        injector.addHeader(header);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode.includes(originalSourceCode)).toBe(true);
        expect(patchedSourceCode.includes(`function header`)).toBe(true);
    }
);


test(
    "add multiple headers to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const headers = [
            () => globalThis.moment = require('moment'),
            () => globalThis.JavaScriptInjector = require('javascript-injector')
        ];

        injector.addHeader(headers);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode).toBe('(' + headers.join(")();(") + ")();" + originalSourceCode);
    }
);
