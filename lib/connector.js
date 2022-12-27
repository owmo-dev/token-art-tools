/* eslint-disable no-undef */
const params = new URLSearchParams(window.location.search);

var hash = params.get('hash');
var number = params.get('number');

if (hash && number) tokenData = {hash: hash, tokenId: 1000000 + number};

alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
fxhash = 'oo' + hash.slice(2, 51);
b58dec = str => [...str].reduce((p, c) => (p * alphabet.length + alphabet.indexOf(c)) | 0, 0);
fxhashTrunc = fxhash.slice(2);
regex = new RegExp('.{' + ((fxhashTrunc.length / 4) | 0) + '}', 'g');
hashes = fxhashTrunc.match(regex).map(h => b58dec(h));
sfc32 = (a, b, c, d) => {
    return () => {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        var t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
};
fxrand = sfc32(...hashes);

var features = {};

function screenshot(name) {
    const art = document.querySelector('canvas');
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = art.width;
    canvas.height = art.height;
    canvas.getContext('2d').drawImage(art, 0, 0);

    let dataUrl = canvas.toDataURL('image/png');
    img.src = dataUrl;

    var hrefElement = document.createElement('a');
    hrefElement.href = dataUrl;
    document.body.append(hrefElement);
    hrefElement.download = name + '.png';
    hrefElement.click();
    hrefElement.remove();
}

window.onload = function () {
    function handleMessage(e) {
        switch (e.data['command']) {
            case 'screenshot':
                screenshot(e.data['token']);
                break;
            case 'getFeatures':
                window.parent.postMessage({command: 'loadFeatures', features: features}, '*');
                break;
            default:
                break;
        }
    }
    window.addEventListener('message', handleMessage);
};
