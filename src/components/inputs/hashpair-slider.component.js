import React, { useState, useEffect } from "react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { RangeStepInput } from "react-range-step-input";

import { ValueToHexPair, RandomInt } from "../../helpers/token.helpers";

const HashPairSlider = (props) => {
    const [locked, setLocked] = useState(false);

    const { index, value, setValueAtIndex, randomHash } = props;

    useEffect(() => {
        if (randomHash && !locked) {
            const v = RandomInt(255);
            setValueAtIndex(index, v);
        }
    });

    const handleChange = (e) => {
        const v = parseInt(e.target.value);
        setValueAtIndex(index, v);
    };

    const stepValue = (inc) => {
        var v = value + parseInt(inc);
        if (v > 255) {
            v = 255;
        } else if (v < 0) {
            v = 0;
        }
        setValueAtIndex(index, v);
    };

    return (
        <Segment inverted style={{ background: "#222", marginBottom: 8, padding: 0 }}>
            <Grid>
                <Grid.Column width={1}>
                    <span style={{ fontFamily: "monospace", fontSize: 16, position: "relative", top: 5, left: -3 }}>
                        {index}
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="minus"
                        size="mini"
                        onClick={() => {
                            stepValue(-16);
                        }}
                        disabled={locked}
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
                            disabled={locked}
                        />
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="plus"
                        size="mini"
                        onClick={() => {
                            stepValue(16);
                        }}
                        disabled={locked}
                    />
                </Grid.Column>
                <Grid.Column width={1}>
                    <span style={{ fontFamily: "monospace", fontSize: 16, position: "relative", top: 5, left: -10 }}>
                        {ValueToHexPair(value)}
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        size="tiny"
                        icon={locked ? "lock" : "unlock"}
                        onClick={() => {
                            setLocked(!locked);
                        }}
                        color={locked ? "red" : null}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default HashPairSlider;
