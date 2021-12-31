import React, {useState, useEffect} from 'react';
import {Input, Button, Icon, Dropdown, Segment} from 'semantic-ui-react';

import {useHash} from '../../hooks/useHash';
import {useURL} from '../../hooks/useURL';
import {useFeatures} from '../../hooks/useFeatures';

import SetResolution from '../modals/set-resolution';
import Instructions from '../copy/instructions';
import Features from '../info/features';

import {screenshot} from '../../helpers/screenshot';

const Viewer = () => {
    const [hash, hashAction] = useHash();
    const [url, urlAction] = useURL();
    const [, featuresAction] = useFeatures();

    const [resolutionValue, setResolutionValue] = useState('fill');
    const [iframeResolution, setIFrameResolution] = useState({x: '100%', y: '100%'});

    function onChange(e) {
        urlAction({type: 'set', url: e.target.value});
    }

    function handleClearURL() {
        urlAction({type: 'clear'});
        hashAction({type: 'clear'});
        featuresAction({type: 'clear'});
        setResolutionValue('fill');
    }

    const resolutionOptions = [
        {
            key: 'fill',
            text: 'Fill Available',
            value: 'fill',
        },
        {
            key: 'detailed',
            text: 'Detailed',
            value: 'detailed',
        },
        {
            key: 'preview',
            text: 'Preview',
            value: 'preview',
        },
        {
            key: 'thumb',
            text: 'Thumbnail',
            value: 'thumb',
        },
        {
            key: 'custom',
            text: 'Custom Resolution',
            value: 'custom',
        },
    ];

    function handleChange(e, d) {
        setResolutionValue(d.value);
        urlAction({type: 'refresh'});
    }

    useEffect(() => {
        switch (resolutionValue) {
            case 'custom':
                openResolutionModal();
                break;
            case 'thumb':
                setIFrameResolution({x: '258px', y: '258px'});
                break;
            case 'preview':
                setIFrameResolution({x: '514px', y: '514px'});
                break;
            case 'detailed':
                setIFrameResolution({x: '1026px', y: '1026px'});
                break;
            default:
            case 'fill':
                setIFrameResolution({x: '100%', y: '100%'});
                break;
        }
    }, [resolutionValue]);

    const [isResolutionModalOpen, setResolutionModalState] = useState(false);

    function openResolutionModal() {
        setResolutionModalState(true);
    }

    function closeResolutionModal() {
        setResolutionModalState(false);
    }

    function setRes(x, y) {
        setIFrameResolution({
            x: x + 2 + 'px',
            y: y + 2 + 'px',
        });
        urlAction({type: 'refresh'});
    }

    return (
        <>
            <SetResolution active={isResolutionModalOpen} close={closeResolutionModal} set={setRes} />
            <div style={{width: 'auto', height: 50, marginBottom: 10, marginTop: 10}}>
                <Button
                    icon
                    disabled={!url.isValid}
                    style={{float: 'right', marginLeft: 20}}
                    onClick={() => {
                        screenshot(hash.hash);
                    }}
                >
                    <Icon name="camera" />
                </Button>
                <Button
                    icon
                    disabled={!url.isValid}
                    floated="right"
                    style={{float: 'right', marginLeft: 20}}
                    onClick={() => {
                        urlAction({type: 'refresh'});
                    }}
                >
                    <Icon name="refresh" />
                </Button>
                <Dropdown
                    selection
                    placeholder="Fit Available Space"
                    disabled={!url.isValid}
                    options={resolutionOptions}
                    value={resolutionValue}
                    onChange={handleChange}
                    style={{float: 'right', marginLeft: 20}}
                />
                <Input
                    label="URL"
                    fluid
                    placeholder="http://127.0.0.1:5500"
                    onChange={onChange}
                    value={url.url}
                    style={{height: 38}}
                    icon={
                        url.url !== '' ? (
                            <Icon
                                name="delete"
                                link
                                onClick={() => {
                                    handleClearURL();
                                }}
                            />
                        ) : null
                    }
                />
            </div>
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 188px)',
                    position: 'relative',
                    border: '1px solid #00000044',
                    marginBottom: 15,
                }}
            >
                <Button
                    icon
                    inverted
                    disabled={!url.isValid}
                    size="mini"
                    onClick={() => {
                        var iframe = window.document.querySelector('iframe');
                        const w = iframe.clientWidth;
                        const h = iframe.clientHeight;
                        window.open(url.url + '?hash=' + hash.hash, '', `top=100, width=${w}, height=${h}`);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        marginBottom: 10,
                        marginRight: 10,
                        zIndex: 1000,
                        opacity: '0.5',
                    }}
                >
                    <Icon name="external" />
                </Button>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        position: 'relative',
                    }}
                >
                    {url.isValid && hash.hash !== undefined ? (
                        <div
                            style={
                                resolutionValue === 'fill'
                                    ? {
                                          width: '100%',
                                          height: '100%',
                                          overflow: 'hidden',
                                      }
                                    : {
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translateX(-50%) translateY(-50%)',
                                      }
                            }
                        >
                            <iframe
                                id={new Date().getTime()}
                                title="token art tools viewer"
                                src={url.url + '?hash=' + hash.hash}
                                width={iframeResolution.x}
                                height={iframeResolution.y}
                                style={{
                                    border: '1px dashed #99999933',
                                }}
                                key={url.iframeKey}
                            />
                        </div>
                    ) : (
                        <div style={{width: '100%', height: '100%', background: '#555', overflow: 'auto'}}>
                            <Instructions />
                        </div>
                    )}
                </div>
            </div>
            <Segment inverted style={{width: '100%', height: 70, padding: 0, paddingBottom: 2}}>
                <Features />
            </Segment>
        </>
    );
};

export default Viewer;
