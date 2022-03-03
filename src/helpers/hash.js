function isValidHash(str) {
    const regexExp = /^0x[a-f0-9]{64}$/gi;
    return regexExp.test(str);
}

export {isValidHash};
