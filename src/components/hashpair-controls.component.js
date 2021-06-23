import React, { useState, useEffect } from "react";
import { Segment, Grid, Button, Icon } from "semantic-ui-react";

import Title from "../components/title.component";
import HashPairSlider from "./hashpair-slider.component";

const HashPairControls = (props) => {
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

    return (
        <>
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column>
                        <Title />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            primary
                            onClick={() => {
                                triggerRandom(true);
                            }}
                            style={{ float: "right", marginTop: 10 }}
                        >
                            <Icon name="random" />
                            Random
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment
                inverted
                style={{ marginTop: 18, maxHeight: "calc(100vh - 170px)", overflow: "auto", background: "#222" }}
            >
                <Segment.Group>{sliders}</Segment.Group>
            </Segment>
            <Segment style={{ padding: 0, margin: 0, paddingTop: 12, paddingBottom: 12 }}>
                <center>
                    <span style={{ fontFamily: "monospace", fontSize: 12 }}>{props.hash}</span>
                </center>
            </Segment>
        </>
    );
};

export default HashPairControls;
