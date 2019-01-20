interface InterfaceVlidator {
    types: any,
    config: any,
    messages:Array<string>, 
    listErrors: Array<{
        prop: string,
        msgs: Array<string>
    }>,
    validate: (data: any) => boolean,
    hasErrors:() => boolean,
    cleanListErrors: () => void
}

export class Validator implements InterfaceVlidator {
    types: any;
    config: any;
    messages: Array<string>;
    listErrors: Array<{
        prop: string,
        msgs: Array<string>
    }>
    constructor(valOptions: { types: any, config: any }) {
        this.types = valOptions.types;
        this.config = valOptions.config;
        this.messages = [];
        this.listErrors = [];
    }

    validate = (data: any) => {
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                this.messages = [];
                const typesForOne = this.config[i];

                for (let j = 0; j < typesForOne.length; j++) {
                    const checker = this.types[typesForOne[j]];

                    if (!typesForOne[j]) {
                        continue;
                    }
                    if (!checker) {
                        const e = new Error(`No handler to validate type${checker}`);

                        e.name = 'ValidationError';
                        throw e;
                    }
                    const success = checker.validate(data[i].value);

                    if (!success) {
                        const msg = `Invalid value. ${checker.instructions}`;

                        this.messages.push(msg);
                    }
                }
            }
            this.listErrors.push({
                prop: i,
                msgs: this.messages
            });
        }
        return this.hasErrors();
    }

    hasErrors = () => {
        return this.listErrors.some(el => el.msgs.length!== 0);
    }

    cleanListErrors = () => {
        this.listErrors = [];
    }
}
