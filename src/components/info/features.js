import React, {useEffect, useState} from 'react';
import {List, Header, Loader} from 'semantic-ui-react';

import {useURL} from '../../hooks/useURL';
import {useHash} from '../../hooks/useHash';
import {useFeatures} from '../../hooks/useFeatures';

const Features = () => {
    const [url] = useURL();
    const [hash] = useHash();
    const [features, featuresAction] = useFeatures();

    const [isLoading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        window.addEventListener('message', e => {
            switch (e.data['command']) {
                case 'loadFeatures':
                    {
                        console.log(e.data['features']);
                        featuresAction({type: 'set', data: e.data['features']});
                    }
                    break;
                default:
                    break;
            }
        });
    }, []);

    useEffect(() => {
        featuresAction({type: 'clear'});
        if (!url.isValid) {
            setList([]);
            return;
        }

        setLoading(true);

        let timerGet = setTimeout(() => {
            var iframe = window.document.querySelector('iframe').contentWindow;
            if (iframe === undefined) return;
            iframe.postMessage({command: 'getFeatures'}, '*');
        }, 600);

        let timerTimeout = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => {
            clearTimeout(timerGet);
            clearTimeout(timerTimeout);
        };
    }, [hash.hash, url.isValid, url.iframeKey]);

    useEffect(() => {
        setList(
            Object.keys(features.data).map(key => {
                return (
                    <List.Item key={key} style={{marginTop: -2}}>
                        <Header as="h4">
                            {features.data[key].toString()}
                            <Header.Subheader style={{marginTop: 3, letterSpacing: 1}}>[ {key} ]</Header.Subheader>
                        </Header>
                    </List.Item>
                );
            }),
        );
    }, [features.data]);

    const example = `features = { Feature: "Value of Feature"}`;

    return (
        <div
            style={{
                height: '100%',
                position: 'relative',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                userSelect: 'none',
            }}
        >
            <center>
                {!url.isValid ? (
                    <Header as="h4" inverted style={{marginTop: 14}}>
                        {'set the "features" variable to display results here'}
                        <Header.Subheader style={{marginTop: 5, font: 'monospace'}}>{example}</Header.Subheader>
                    </Header>
                ) : url.isValid && list.length === 0 ? (
                    isLoading ? (
                        <Loader active />
                    ) : (
                        <div style={{font: 'monospace', marginTop: 30, color: '#999'}}>no features found</div>
                    )
                ) : (
                    <List horizontal inverted relaxed size="mini" style={{margin: '13px 30px 0px 30px'}}>
                        {list}
                    </List>
                )}
            </center>
        </div>
    );
};

export default Features;
