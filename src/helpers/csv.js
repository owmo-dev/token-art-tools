export function exportCSV(features) {
    console.log(features);

    let csvContent = 'data:text/csv;charset=utf-8,';

    let keys = Object.keys(features[0]);
    csvContent += keys;
    csvContent += '\r\n';

    features.map(feature => {
        csvContent += Object.keys(feature).map(key => {
            console.log(feature[key]);
            return feature[key];
        });
        csvContent += '\r\n';
        return null;
    });

    var encodedUri = encodeURI(csvContent);
    var hrefElement = document.createElement('a');
    hrefElement.href = encodedUri;
    hrefElement.download = `features_${new Date().toJSON().slice(0, 10)}.csv`;
    document.body.appendChild(hrefElement);
    hrefElement.click();
    hrefElement.remove();
}
