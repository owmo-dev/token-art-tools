import React, { useState, useEffect } from "react";
import { Segment, Grid, Button, Icon } from "semantic-ui-react";

import Title from "../copy/title.component";
import HashPairSlider from "../inputs/hashpair-slider.component";
import SetHash from "../modals/set-hash.component";

const LeftControls = (props) => {
    const [sliders, setSliders] = useState();
    const [randomHash, triggerRandom] = useState(false);

    const { update } = props;

    useEffect(() => {
        let s = [];
        for (let i = 0; i < 32; i++) {
            s = s.concat(<HashPairSlider key={i} index={i} id={i} name={i} update={update} randomHash={randomHash} />);
        }
        setSliders(s);
    }, [update, randomHash]);

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

    return (
        <>
            <SetHash active={isSetHashModalOpen} close={closeSetHashModal} setHash={props.setHash} />
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column>
                        <Title />
                    </Grid.Column>
                    <Grid.Column style={{ paddingTop: 11 }}>
                        <Button icon color="red" disabled style={{ float: "right", marginLeft: 15 }} onClick={() => {}}>
                            <Icon name="undo" />
                        </Button>
                        <Button
                            icon
                            color="green"
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
                </Grid.Row>
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
                    navigator.clipboard.writeText(props.hash);
                }}
            >
                <span style={{ fontFamily: "monospace", fontSize: 11 }}>{props.hash}</span>
                <Icon
                    icon
                    color="grey"
                    name="copy"
                    size="small"
                    style={{ float: "right", marginRight: 10, marginTop: 6 }}
                />
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
