export function iota(start = 0) {
    let count = start;
    let firstProp = true;
    return new Proxy(
        {},
        {
            get(o, prop) {
                if (firstProp) {
                    firstProp = false;
                    return {
                        // Enum descriptor
                        get values() {
                            return o;
                        },
                    };
                }
                if (prop in o) return o[prop];
                else return (o[prop] = count++);
            },
        },
    );
}
