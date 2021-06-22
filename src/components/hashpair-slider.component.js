import React, { useState, useEffect } from "react";

import { Segment, Grid, Input } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const HashPairSlider = (props) => {
    const [hex, setHex] = useState("");

    useEffect(() => {
        setHex("00");
    }, []);

    function handleChange(value) {
        setHex(ValueToHexPair(value));
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
                <Grid.Column width={1}>{props.index}</Grid.Column>
                <Grid.Column width={12}>
                    <Slider inverted discrete color="black" settings={settings} />
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
