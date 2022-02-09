const params = new URLSearchParams(window.location.search);

// eslint-disable-next-line no-unused-vars
var tokenData = {hash: params.get('hash'), tokenId: 1000000 + params.get('number')};

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
