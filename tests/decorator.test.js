import { JavaScriptInjector } from "../JavaScriptInjector.mjs";


test(
    "add a decorator to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const decorator = `function (cb) { console.log("This is a decorator."); cb(); }`;

        injector.addDecorator(decorator);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode.startsWith(`( () => { const `)).toBe(true);
        expect(patchedSourceCode.endsWith(`);} )()`)).toBe(true);
    }
);


test(
    "add multiple decorators to source code",
    () => {
        const originalSourceCode = `console.log("Hello, world!");`;

        const injector = new JavaScriptInjector();

        const decorators = [
            `function (cb) { console.log("First decorator."); cb(); }`,
            `function (cb) { console.log("Second decorator."); cb(); }`
        ];

        injector.addDecorator(decorators);

        const patchedSourceCode = injector.inject(originalSourceCode);

        expect(patchedSourceCode.startsWith(`( () => { const `)).toBe(true);
        expect(patchedSourceCode.endsWith(`);} )()`)).toBe(true);
    }
);
