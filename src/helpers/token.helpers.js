export function ValueToHexPair(value) {
    var hex = Number(value).toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}

export function HexPairToValue(hex) {
    return parseInt('0x' + hex);
}

export function SetCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

export function RandomInt(max) {
    return Math.floor(Math.random() * max);
}
