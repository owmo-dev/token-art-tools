import React, {useState} from 'react';
import {Segment, Grid, Button, Icon} from 'semantic-ui-react';

import {useURL} from '../../hooks/useURL';
import {useHash} from '../../hooks/useHash';
import {useAutomation} from '../../hooks/useAutomation';

import Title from '../copy/title';
import HashPairSlider from '../inputs/hashpair-slider';
import SetHash from '../modals/set-hash';
import InitAutomation from '../modals/init-automation';
import RunAutomation from '../modals/run-automation';

const Controls = () => {
    const [url] = useURL();
    const [hash, hashAction] = useHash();
    const [automation] = useAutomation();

    function makeSliders() {
        let sliders = [];
        for (let i = 0; i < hash.params.count; i++) {
            sliders.push(<HashPairSlider key={i} index={i} />);
        }
        return sliders;
    }

    const sliders = makeSliders();

    const [isSetHashModalOpen, setSetHashModalState] = useState(false);

    function openSetHashModal() {
        setSetHashModalState(true);
    }

    function closeSetHashModal() {
        setSetHashModalState(false);
    }

    const [isInitAutoModalOpen, setInitAutoModalState] = useState(false);

    function openInitAutoModal() {
        setInitAutoModalState(true);
    }

    function closeInitAutoModal() {
        setInitAutoModalState(false);
    }

    return (
        <>
            <RunAutomation />
            <SetHash active={isSetHashModalOpen} close={closeSetHashModal} />
            <InitAutomation active={isInitAutoModalOpen} close={closeInitAutoModal} />
            <Grid>
                <Grid.Column
                    style={{
                        width: 230,
                        margin: 0,
                        padding: 15,
                        paddingRight: 0,
                    }}
                >
                    <Title />
                </Grid.Column>
                <Grid.Column style={{width: 265, padding: 0, paddingTop: 25}}>
                    <Button
                        icon
                        color="red"
                        disabled={hash.history.length === 0 || automation.status !== 'idle'}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={() => {
                            hashAction({type: 'clear'});
                        }}
                    >
                        <Icon name="x" />
                    </Button>
                    <Button
                        icon
                        color="purple"
                        disabled={hash.history.length === 0 || automation.status !== 'idle'}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={() => {
                            hashAction({type: 'back'});
                        }}
                    >
                        <Icon name="undo" />
                    </Button>
                    <Button
                        icon
                        color="pink"
                        disabled={!url.isValid || automation.status !== 'idle'}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={openInitAutoModal}
                    >
                        <Icon name="cog" />
                    </Button>
                    <Button
                        icon
                        color="teal"
                        disabled={!url.isValid || automation.status !== 'idle'}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={() => {
                            openSetHashModal();
                        }}
                    >
                        <Icon name="sign in alternate" />
                    </Button>
                    <Button
                        icon
                        color="blue"
                        disabled={!url.isValid || automation.status !== 'idle'}
                        style={{float: 'right'}}
                        onClick={() => {
                            hashAction({type: 'random'});
                        }}
                    >
                        <Icon name="random" />
                    </Button>
                </Grid.Column>
            </Grid>
            <Segment
                inverted
                style={{
                    marginTop: 18,
                    maxHeight: 'calc(100vh - 150px)',
                    overflow: 'auto',
                    background: '#222',
                    padding: 20,
                }}
            >
                <Segment.Group>{sliders}</Segment.Group>
            </Segment>
            <Segment
                style={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 2,
                    paddingBottom: 4,
                    paddingLeft: 15,
                    marginTop: 15,
                    cursor: 'pointer',
                    userSelect: 'none',
                    background: '#CCC',
                }}
                onClick={() => {
                    navigator.clipboard.writeText(hash.hash);
                }}
            >
                <span style={{fontFamily: 'monospace', fontSize: 11}}>{hash.hash}</span>
                <Icon color="grey" name="copy" size="small" style={{float: 'right', marginRight: 10, marginTop: 6}} />
            </Segment>
        </>
    );
};

export default Controls;