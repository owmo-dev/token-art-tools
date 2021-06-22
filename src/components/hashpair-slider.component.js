import React, { useState, useEffect } from "react";

import { Segment, Grid, Input, Button } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const HashPairSlider = (props) => {
    const [hex, setHex] = useState("");
    const [value, setValue] = useState(0);

    const { index, update } = props;

    useEffect(() => {
        setHex("00");
    }, []);

    const updateValue = (v) => {
        setValue(v);
        var h = ValueToHexPair(v);
        if (hex !== h) setHex(h);
        update(index, h);
    };

    const stepValue = (inc) => {
        var v = value;
        v += inc;
        switch (v) {
            case v >= 256:
                v = 255;
                break;
            case v < 0:
                v = 0;
                break;
            default:
        }
        updateValue(v);
    };

    const settings = {
        start: 0,
        min: 0,
        max: 255,
        step: 1,
        onChange: (v) => {
            updateValue(v);
        },
    };

    return (
        <Segment inverted style={{ overflow: "auto", background: "#222" }}>
            <Grid>
                <Grid.Column width={1}>
                    <span style={{ top: 5, position: "relative" }}>{props.index}</span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="minus"
                        size="mini"
                        onClick={() => {
                            stepValue(-1);
                        }}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <span style={{ top: 4, position: "relative" }}>
                        <Slider inverted discrete color="grey" settings={settings} />
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="plus"
                        size="mini"
                        onClick={() => {
                            stepValue(1);
                        }}
                    />
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
