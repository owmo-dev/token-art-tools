import React, { useState, useEffect } from "react";
import { Segment, List, Button, Icon } from "semantic-ui-react";

import HashPairSlider from "./hashpair-slider.component";

const HashPairControls = (props) => {
    const [sliders, setSliders] = useState();

    useEffect(() => {
        let s = [];
        for (let i = 0; i < 32; i++) {
            s = s.concat(<HashPairSlider key={i} index={i} />);
        }
        setSliders(s);
    }, []);

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
            <Segment>Hash here</Segment>
        </>
    );
};

export default HashPairControls;
