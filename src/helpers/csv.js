/*
export function exportCSV(list) {
    let csvContent = 'data:text/csv;charset=utf-8,';

    csvContent += Object.keys(features).map(key => {
        return key;
    });
    csvContent += '\r\n';

    list.map(features => {
        csvContent += Object.keys(features).map(key => {
            return features[key];
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
*/
