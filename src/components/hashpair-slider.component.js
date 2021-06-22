import React, { useState, useEffect } from "react";

import { Segment, Grid, Input, Button } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const HashPairSlider = (props) => {
    const [hex, setHex] = useState("");

    const { index, update } = props;

    useEffect(() => {
        setHex("00");
    }, []);

    function handleChange(value) {
        var v = ValueToHexPair(value);
        setHex(v);
        update(index, v);
    }

    const settings = {
        start: 0,
        min: 0,
        max: 255,
        step: 1,
        onChange: (value) => {
            handleChange(value);
        },
    };

    return (
        <Segment inverted style={{ overflow: "auto" }}>
            <Grid>
                <Grid.Column width={1}>
                    <span style={{ top: 5, position: "relative" }}>{props.index}</span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button circular icon="minus" size="mini" />
                </Grid.Column>
                <Grid.Column width={8}>
                    <span style={{ top: 4, position: "relative" }}>
                        <Slider inverted discrete color="grey" settings={settings} />
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button circular icon="plus" size="mini" />
                </Grid.Column>
                <Grid.Column width={3}>
                    <Input fluid maxLength="2" style={{ width: 50 }} value={hex} />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

function ValueToHexPair(value) {
    var hex = Number(value).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

export default HashPairSlider;
