import React, { useState, useEffect } from "react";
import { Segment, List, Button, Icon } from "semantic-ui-react";

import HashPairSlider from "./hashpair-slider.component";

const HashPairControls = (props) => {
    const [sliders, setSliders] = useState();

    const { update } = props;

    useEffect(() => {
        let s = [];
        for (let i = 0; i < 32; i++) {
            s = s.concat(<HashPairSlider key={i} index={i} update={update} />);
        }
        setSliders(s);
    }, [update]);

    return (
        <>
            <List horizontal>
                <List.Item>
                    <Button>
                        <Icon name="random" />
                        Random Hash
                    </Button>
                </List.Item>
            </List>
            <Segment inverted style={{ maxHeight: "calc(100vh - 240px)", overflow: "auto" }}>
                <Segment.Group>{sliders}</Segment.Group>
            </Segment>
            <Segment>
                <center>
                    <span style={{ fontFamily: "monospace", fontSize: 12 }}>{props.hash}</span>
                </center>
            </Segment>
        </>
    );
};

export default HashPairControls;
