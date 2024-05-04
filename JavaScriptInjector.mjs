export class JavaScriptInjector {
    /**
     * @type {string}
     */
    #body


    /**
     * @type {string[]}
     */
    #footers


    /**
     * @type {string[]}
     */
    #headers


    constructor (sourceCode) {
        this.#body = sourceCode;

        this.#headers = [];
        this.#footers = [];
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
        return new this(this.toString());
    }


    getBody () {
        return this.#body;
    }


    getFooters () {
        return structuredClone(this.#footers);
    }


    getHeaders () {
        return structuredClone(this.#headers);
    }


    toString () {
        const body = this.#body;

        let headers = this.#headers.join(';');
        let footers = this.#footers.join(';');

        let sourceCode = body;

        if (headers.length > 0) {
            if (!headers.endsWith(';')) {
                headers += ';';
            }

            sourceCode = headers + sourceCode;
        }

        if (footers.length > 0) {
            if (!footers.startsWith(';')) {
                footers = ';' + footers;
            }

            sourceCode = sourceCode + footers;
        }

        while (sourceCode.includes(";;")) {
            sourceCode = sourceCode.replaceAll(";;", ';');
        }

        return sourceCode;
    }
}
