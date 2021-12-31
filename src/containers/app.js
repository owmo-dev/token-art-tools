import React, {useState, useEffect, useReducer} from 'react';

import Viewer from '../components/panels/viewer';
import Controls from '../components/panels/controls';

import {URLProvider} from '../hooks/useURL';
import {useHash} from '../hooks/useHash';

// !!! slider locks do not work
// !!! automation is broken on second run

const loopReducer = (state, dispatch) => {
    switch (dispatch.type) {
        case 'tick':
            if (state === false) state = -1;
            return state + 1;
        case 'reset':
            return false;
        default:
            return state;
    }
};

const App = () => {
    const [hash, hashAction] = useHash();
    const [loop, loopAction] = useReducer(loopReducer, false);

    const screenshot = () => {
        var iframe = window.document.querySelector('iframe').contentWindow;
        if (iframe === undefined) return;
        iframe.postMessage({command: 'screenshot', token: hash.hash}, '*');
    };

    const [stopping, setStopping] = useState(false);
    const [progress, setProgress] = useState(0);

    const [tick, setTick] = useState(null);
    const [total, setTotal] = useState(0);

    const [features, setFeatures] = useState({});
    const [featuresList, setFeaturesList] = useState([]);
    const [doCSVExport, setCSVExport] = useState(false);

    const exportCSV = list => {
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
    };

    function startAutomation(total, wait, csv) {
        setProgress(0);
        setFeaturesList([]);
        setTotal(total);
        setCSVExport(csv);
        setStopping(false);
        hashAction({type: 'random'});
        setTick(
            setInterval(() => {
                loopAction({type: 'tick'});
            }, wait),
        );
    }

    function stopAutomation() {
        if (stopping) return;
        clearInterval(tick);
        setTick(null);
        setTotal(0);
        loopAction({type: 'reset'});
        setProgress(100);
        setStopping(true);
        if (doCSVExport) {
            exportCSV(featuresList);
        }
    }

    useEffect(() => {
        if (!loop || isNaN(loop)) return;
        if (loop > total) {
            stopAutomation();
            return;
        }
        screenshot();
        if (doCSVExport) {
            setTimeout(() => {
                var f = features;
                f['Hash'] = hash.hash;
                setFeaturesList(prev => [...prev, f]);
            }, 1000);
        }
        setProgress(parseInt((loop / total) * 100));
        if (loop === total) return;
        hashAction({type: 'random'});
    }, [loop]);

    const [iFrameKey, setIframeKey] = useState(0);
    const refresh = () => {
        setIframeKey(iFrameKey + 1);
    };

    return (
        <URLProvider>
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                <div style={{width: 480, position: 'absolute', top: 20, left: 20}}>
                    <Controls startAutomation={startAutomation} stopAutomation={stopAutomation} progress={progress} />
                </div>
                <div
                    style={{
                        marginLeft: 500,
                        padding: 20,
                        height: '100vh',
                        width: 'auto',
                        minWidth: 800,
                    }}
                >
                    <Viewer iFrameKey={iFrameKey} refresh={refresh} screenshot={screenshot} features={features} setFeatures={setFeatures} />
                </div>
            </div>
        </URLProvider>
    );
};

export default App;
