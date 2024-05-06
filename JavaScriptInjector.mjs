import randomInteger from '@voidvoxel/random-integer';


const EXPORT_KEYWORD = 'export';


/**
 * Modify JavaScript by adding headers, footers, and decorators to source code.
 *
 * ```js
 * const undecorated = `console.log("undecorated");`;
 *
 *
 * function decorator (callback) {
 *     console.log("before");
 *
 *     callback();
 *
 *     console.log("after");
 * }
 *
 *
 * const injector = new JavaScriptInjector();
 *
 * injector.addDecorator(decorator);
 *
 * const decorated = injector.inject(undecorated);
 *
 * const f = new Function(decorated);
 *
 * f();
 * ```
 */
export default class JavaScriptInjector {
    /**
     * @type {string[]}
     */
    #decorators


    /**
     * @type {string[]}
     */
    #footers


    /**
     * @type {string[]}
     */
    #headers


    constructor () {
        this.#decorators = [];
        this.#headers = [];
        this.#footers = [];
    }


    addDecorator (...decorators) {
        decorators = decorators.flat(Infinity);

        for (let decorator of decorators) {
            if (typeof decorator === 'function') {
                decorator = decorator.toString();
            }

            decorator = decorator.trim();

            // Remove the `export` keyword from the decorator.
            if (decorator.startsWith(EXPORT_KEYWORD)) {
                decorator = decorator.substring(EXPORT_KEYWORD.length);
            }

            this.#decorators.push(decorator);
        }
    }


    addFooter (...footers) {
        footers = footers.flat(Infinity);

        for (let footer of footers) {
            if (typeof footer === 'function') {
                footer = `(${footer.toString()})()`;
            }

            this.#footers.push(footer);
        }
    }


    addHeader (...headers) {
        headers = headers.flat(Infinity);

        for (let header of headers) {
            if (typeof header === 'function') {
                header = `(${header.toString()})()`;
            }

            this.#headers.push(header);
        }
    }


    /**
     * Build the `JavaScriptInjector` into a reusable `function`.
     */
    build () {
        const injector = this;

        /**
         * Modify source code with headers, footers, decorators, etc.
         * @param {string} sourceCode
         * The source code to modify.
         * @returns {string}
         * The modified source code.
         */
        function inject (sourceCode) {
            return injector.inject(sourceCode);
        }

        return inject;
    }


    /**
     * Evaluate source code after modifying it.
     * @param {string} sourceCode
     * The source code to evaluate.
     * @returns {*}
     * The result of the evaluated source code.
     */
    eval (sourceCode) {
        // Modify the source code.
        sourceCode = this.inject(sourceCode);

        // Evaluate the modified source code.
        return eval(sourceCode);
    }


    getDecorators () {
        return structuredClone(this.#decorators);
    }


    getFooters () {
        return structuredClone(this.#footers);
    }


    getHeaders () {
        return structuredClone(this.#headers);
    }


    /**
     * Modify source code by applying this injector's headers, footers, and
     * decorators to the source code.
     * @param {string} sourceCode
     * The source code to modify.
     * @returns {string}
     * The modified source code.
     */
    inject (sourceCode) {
        const body = sourceCode;

        let headers = this.#getHeaderString();
        let footers = this.#getFooterString();

        sourceCode = headers + body + footers;

        sourceCode = this.#decorate(sourceCode);

        sourceCode = sourceCode.trim();

        // Remove all newlines.
        sourceCode.replaceAll('\n', ' ');

        // Trim semicolons at the end.
        sourceCode = sourceCode + '\n';

        while (sourceCode.includes(";\n")) {
            sourceCode = sourceCode.replaceAll(";\n", ';');
        }

        // Trim all whitespace from the end of the source code.
        sourceCode = sourceCode.trimEnd();

        // Remove the whitespace surrounding all semicolons.
        while (sourceCode.includes("; ")) {
            sourceCode = sourceCode.replaceAll("; ", ';');
        }

        while (sourceCode.includes(" ;")) {
            sourceCode = sourceCode.replaceAll(" ;", ';');
        }

        // Remove all double semicolons.
        while (sourceCode.includes(";;")) {
            sourceCode = sourceCode.replaceAll(";;", ';');
        }

        // Remove initial semicolons.
        if (sourceCode.startsWith(';')) {
            sourceCode = sourceCode.substring(1);
        }

        // Remove final semicolons.
        // if (sourceCode.startsWith(';')) {
        //     sourceCode = sourceCode.substring(0, sourceCode.length - 1);
        // }

        return sourceCode;
    }


    #decorate (sourceCode) {
        let decorators = structuredClone(this.#decorators);

        while (decorators.length > 0) {
            const decorator = decorators.pop();

            // Create random IDs for both the body and the decorator.
            const bodyId = '_' + randomInteger();
            const decoratorId = '_' + randomInteger();

            // Create an array to hold all of the lines of code.
            const lines = [];

            // Define the decorator.
            lines.push(`const ${decoratorId} = (${decorator});`);

            // Define the body.
            // The body is the original source code to be decorated.
            lines.push(`const ${bodyId} = ( () => { ${sourceCode} } );`);

            // Decorate the body.
            lines.push(`${decoratorId}(${bodyId});`);

            // Update the source code.
            sourceCode = `( () => { ${lines.join(';')} } )()`;
        }

        return sourceCode;
    }


    #getFooterString () {
        let footers = this.#footers.join(';');

        if (footers.length > 0) {
            if (!footers.startsWith(';')) {
                footers = ';' + footers;
            }
        }

        return footers === ';' ? '' : footers;
    }


    #getHeaderString () {
        let headers = this.#headers.join(';');

        if (headers.length > 0) {
            if (!headers.endsWith(';')) {
                headers += ';';
            }
        }

        return headers === ';' ? '' : headers;
    }
}
