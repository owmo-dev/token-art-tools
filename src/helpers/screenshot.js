export function screenshot(hash) {
    var iframe = window.document.querySelector('iframe').contentWindow;
    if (iframe === undefined) return;
    iframe.postMessage({command: 'screenshot', token: hash}, '*');
}
