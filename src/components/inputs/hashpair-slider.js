import React, {useState, useEffect} from 'react';
import {Segment, Grid, Button} from 'semantic-ui-react';
import {RangeStepInput} from 'react-range-step-input';

import {useURL} from '../../hooks/useURL';
import {useHash} from '../../hooks/useHash';
import {useAutomation} from '../../hooks/useAutomation';

import {clamp} from '../../helpers/math';

const HashPairSlider = props => {
    const [url] = useURL();
    const [hash, hashAction] = useHash();
    const [automation] = useAutomation();

    const [value, setValue] = useState(0);
    const [locked, setLocked] = useState(false);

    const {index} = props;

    useEffect(() => {
        if (hash.values[index] !== value) {
            setValue(hash.values[index]);
        }
    }, [hash]);

    useEffect(() => {
        if (value !== hash.values[index]) {
            hashAction({type: 'setValue', index: index, value: value});
        }
    }, [value]);

    useEffect(() => {
        if (locked !== hash.locked[index]) {
            setLocked(hash.locked[index]);
        }
    });

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
                        disabled={locked || !url.isValid || automation.status !== 'idle'}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <span style={{top: 4, position: 'relative'}}>
                        <RangeStepInput
                            min={hash.params.min}
                            max={hash.params.max}
                            step={hash.params.step}
                            onChange={handleChange}
                            value={value}
                            style={{width: '100%'}}
                            disabled={locked || !url.isValid || automation.status !== 'idle'}
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
                        disabled={locked || !url.isValid || automation.status !== 'idle'}
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
                        {hash.hash !== undefined ? hash.hash[index * 2 + 2] + hash.hash[index * 2 + 3] : '--'}
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        size="tiny"
                        icon={locked ? 'lock' : 'unlock'}
                        onClick={() => {
                            hashAction({type: 'toggle-locked', index: index});
                        }}
                        disabled={!url.isValid || automation.status !== 'idle'}
                        color={locked ? 'red' : null}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default HashPairSlider;
