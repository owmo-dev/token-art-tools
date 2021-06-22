import React, { useState, useEffect } from "react";
import { Segment, Grid, Input, Button } from "semantic-ui-react";
import { RangeStepInput } from "react-range-step-input";

import { ValueToHexPair } from "../helpers/token.helpers";

const HashPairSlider = (props) => {
    const [hex, setHex] = useState("");
    const [value, setValue] = useState(0);

    const { index, update } = props;

    useEffect(() => {
        setHex("00");
    }, []);

    const handleChange = (e) => {
        const v = parseInt(e.target.value);
        updateValue(v);
    };

    const updateValue = (v) => {
        if (value === v) return;
        setValue(v);
        var h = ValueToHexPair(v);
        if (hex !== h) setHex(h);
        update(index, h);
    };

    const stepValue = (inc) => {
        var v = value + parseInt(inc);
        if (v > 255) {
            v = 255;
        } else if (v < 0) {
            v = 0;
        }
        updateValue(v);
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
                            stepValue(-8);
                        }}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <span style={{ top: 4, position: "relative" }}>
                        <RangeStepInput
                            min={0}
                            max={255}
                            step={1}
                            onChange={handleChange}
                            value={value}
                            style={{ width: "100%" }}
                        />
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="plus"
                        size="mini"
                        onClick={() => {
                            stepValue(8);
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

export default HashPairSlider;
