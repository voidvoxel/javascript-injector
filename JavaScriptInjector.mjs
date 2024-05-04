import randomInteger from '@voidvoxel/random-integer';


const EXPORT_KEYWORD = 'export';


export class JavaScriptInjector {
    /**
     * @type {string}
     */
    #body


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


    constructor (sourceCode) {
        this.setBody(sourceCode);

        this.#decorators = [];
        this.#headers = [];
        this.#footers = [];
    }


    addDecorator (...decorators) {
        decorators = decorators.flat(Infinity);

        for (let decorator of decorators) {
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
            this.#footers.push(footer);
        }
    }


    addHeader (...headers) {
        headers = headers.flat(Infinity);

        for (let header of headers) {
            this.#headers.push(header);
        }
    }


    build () {
        return new JavaScriptInjector(this.toString());
    }


    getBody () {
        return this.#body;
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


    setBody (sourceCode) {
        this.#body = sourceCode.trim();
    }


    toString () {
        const body = this.#body;

        let decorators = structuredClone(this.#decorators);

        let headers = this.#getHeaderString();
        let footers = this.#getFooterString();

        let sourceCode = headers + body + footers;

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

        sourceCode = sourceCode.trim();

        // Trim semicolons at the end.
        sourceCode = sourceCode + '\n';

        while (sourceCode.includes(";\n")) {
            sourceCode = sourceCode.replaceAll(";\n", ';');
        }

        sourceCode = sourceCode.trimEnd();

        // Remove all double semi-colons.
        while (sourceCode.includes(";;")) {
            sourceCode = sourceCode.replaceAll(";;", ';');
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
