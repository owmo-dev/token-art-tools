import React, {useState, useEffect} from 'react';
import {Segment, Grid, Button} from 'semantic-ui-react';
import {RangeStepInput} from 'react-range-step-input';

import {clamp} from '../../helpers/math.helpers';
import {useHash} from '../../hooks/useHash';

const HashPairSlider = props => {
    const [state, dispatch] = useHash();
    const [value, setValue] = useState(0);
    const [locked, setLocked] = useState(false);

    const {index, isValidUrl} = props;

    useEffect(() => {
        if (state.values[index] !== value) {
            setValue(state.values[index]);
        }
    }, [state]);

    useEffect(() => {
        if (value !== state.values[index]) {
            dispatch({type: 'setValue', index: index, value: value});
        }
    }, [value]);

    const handleChange = e => {
        const v = parseInt(e.target.value);
        setValue(v);
    };

    const stepValue = inc => {
        setValue(clamp(value + inc, 0, 255));
    };

    return (
        <Segment inverted style={{background: '#222', marginBottom: 8, padding: 0}}>
            <Grid>
                <Grid.Column width={1}>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 16,
                            position: 'relative',
                            top: 5,
                            left: -3,
                            userSelect: 'none',
                        }}
                    >
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
                        disabled={locked || !isValidUrl}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <span style={{top: 4, position: 'relative'}}>
                        <RangeStepInput
                            min={state.params.min}
                            max={state.params.max}
                            step={state.params.step}
                            onChange={handleChange}
                            value={value}
                            style={{width: '100%'}}
                            disabled={locked || !isValidUrl}
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
                        disabled={locked || !isValidUrl}
                    />
                </Grid.Column>
                <Grid.Column width={1}>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 16,
                            position: 'relative',
                            top: 5,
                            left: -10,
                            userSelect: 'none',
                        }}
                    >
                        {state.hash !== undefined ? state.hash[index * 2 + 2] + state.hash[index * 2 + 3] : '--'}
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        size="tiny"
                        icon={locked ? 'lock' : 'unlock'}
                        onClick={() => {
                            setLocked(!locked);
                        }}
                        disabled={!isValidUrl}
                        color={locked ? 'red' : null}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default HashPairSlider;
