import React, { useState, useEffect } from "react";
import { Segment, Grid, Button, Icon } from "semantic-ui-react";

import Title from "../copy/title.component";
import HashPairSlider from "../inputs/hashpair-slider.component";
import SetHash from "../modals/set-hash.component";

const LeftControls = (props) => {
    const [randomHash, triggerRandom] = useState(false);

    const { hash, values, setValueAtIndex, setHashValues, hashHistory } = props;

    function makeSliders() {
        var s = [];
        for (let i = 0; i < 32; i++) {
            s.push(
                <HashPairSlider
                    key={i}
                    index={i}
                    value={values[i]}
                    setValueAtIndex={setValueAtIndex}
                    randomHash={randomHash}
                />
            );
        }
        return s;
    }

    const sliders = makeSliders();

    useEffect(() => {
        if (randomHash) triggerRandom(false);
    }, [randomHash]);

    const [isSetHashModalOpen, setSetHashModalState] = useState(false);

    function openSetHashModal() {
        setSetHashModalState(true);
    }

    function closeSetHashModal() {
        setSetHashModalState(false);
    }

    function goBackOneHash() {
        setHashValues(hashHistory[hashHistory.length - 1]);
    }

    return (
        <>
            <SetHash active={isSetHashModalOpen} close={closeSetHashModal} setHashValues={setHashValues} />
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
                <Grid.Column style={{ width: 265, padding: 0, paddingTop: 25 }}>
                    <Button
                        icon
                        color="purple"
                        disabled={hashHistory.length === 0}
                        style={{ float: "right", marginLeft: 15 }}
                        onClick={goBackOneHash}
                    >
                        <Icon name="undo" />
                    </Button>
                    <Button icon color="pink" style={{ float: "right", marginLeft: 15 }} onClick={() => {}}>
                        <Icon name="cog" />
                    </Button>
                    <Button
                        icon
                        color="teal"
                        style={{ float: "right", marginLeft: 15 }}
                        onClick={() => {
                            openSetHashModal();
                        }}
                    >
                        <Icon name="sign-in" />
                    </Button>
                    <Button
                        icon
                        color="blue"
                        style={{ float: "right" }}
                        onClick={() => {
                            triggerRandom(true);
                        }}
                    >
                        <Icon name="random" />
                    </Button>
                </Grid.Column>
            </Grid>
            <Segment
                style={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 2,
                    paddingBottom: 4,
                    paddingLeft: 15,
                    marginTop: 15,
                    cursor: "pointer",
                    userSelect: "none",
                }}
                onClick={() => {
                    navigator.clipboard.writeText(hash);
                }}
            >
                <span style={{ fontFamily: "monospace", fontSize: 11 }}>{hash}</span>
                <Icon color="grey" name="copy" size="small" style={{ float: "right", marginRight: 10, marginTop: 6 }} />
            </Segment>
            <Segment
                inverted
                style={{
                    marginTop: 18,
                    maxHeight: "calc(100vh - 150px)",
                    overflow: "auto",
                    background: "#222",
                    padding: 20,
                }}
            >
                <Segment.Group>{sliders}</Segment.Group>
            </Segment>
        </>
    );
};

export default LeftControls;
