import React, {useState, useEffect, memo, forwardRef} from 'react';
import {Segment, Grid, Button} from 'semantic-ui-react';
import {RangeStepInput} from 'react-range-step-input';

import {useURL} from '../../hooks/useURL';
import {useHash} from '../../hooks/useHash';
import {useAutomation} from '../../hooks/useAutomation';

import {clamp} from '../../helpers/math';
import {iota} from '../../helpers/iota';

const {TYPE_HASH, TYPE_NUMBER} = iota();

function withStateSlice(Comp, slice) {
    const MemoComp = memo(Comp);
    function Wrapper(props, ref) {
        const state = useHash();
        return <MemoComp ref={ref} state={slice(state, props)} {...props} />;
    }
    Wrapper.displayName = `withStateSlice(${Comp.displayName || Comp.name})`;
    return memo(forwardRef(Wrapper));
}

function SliderControl({index, min, max, step, type}) {
    const [url] = useURL();
    const [hash, hashAction] = useHash();
    const [automation] = useAutomation();

    const [value, setValue] = useState(0);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (type === TYPE_HASH) {
            if (hash.values[index] !== value) {
                setValue(hash.values[index]);
            }
        } else if (type === TYPE_NUMBER) {
            if (hash.number !== value) {
                setValue(hash.number);
            }
        }
    }, [hash]);

    useEffect(() => {
        if (type === TYPE_HASH) {
            if (value !== hash.values[index]) {
                hashAction({type: 'setValue', index: index, value: value});
            }
        } else if (type === TYPE_NUMBER) {
            if (value !== hash.number) {
                hashAction({type: 'setNumber', value: value});
            }
        }
    }, [value]);

    useEffect(() => {
        if (type === TYPE_HASH) {
            if (locked !== hash.locked[index]) {
                setLocked(hash.locked[index]);
            }
        } else if (type === TYPE_NUMBER) {
            if (locked !== hash.numberLocked) {
                setLocked(hash.numberLocked);
            }
        }
    });

    const handleChange = e => {
        const v = parseInt(e.target.value);
        setValue(v);
    };

    const stepValue = inc => {
        if (type === TYPE_HASH) {
            setValue(clamp(value + inc, hash.params.min, hash.params.max));
        } else {
            setValue(clamp(value + inc, hash.params.start, hash.params.editions));
        }
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
                            stepValue(type === TYPE_HASH ? -16 : type === TYPE_NUMBER ? -10 : 0);
                        }}
                        disabled={locked || !url.isValid || automation.status !== 'idle'}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <span style={{top: 4, position: 'relative'}}>
                        <RangeStepInput
                            min={min}
                            max={max}
                            step={step}
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
                            stepValue(type === TYPE_HASH ? 16 : type === TYPE_NUMBER ? 10 : 0);
                        }}
                        disabled={locked || !url.isValid || automation.status !== 'idle'}
                    />
                </Grid.Column>
                <Grid.Column width={1}>
                    <span
                        style={
                            type === TYPE_HASH
                                ? {
                                      fontFamily: 'monospace',
                                      fontSize: 16,
                                      position: 'relative',
                                      top: 5,
                                      left: -10,
                                      userSelect: 'none',
                                  }
                                : {
                                      fontFamily: 'monospace',
                                      fontSize: 16,
                                      position: 'absolute',
                                      width: 50,
                                      height: 20,
                                      top: 18,
                                      left: -10,
                                      textAlign: 'center',
                                  }
                        }
                    >
                        {hash.hash !== undefined
                            ? type === TYPE_HASH
                                ? hash.hash[index * 2 + 2] + hash.hash[index * 2 + 3]
                                : type === TYPE_NUMBER
                                ? hash.number
                                : '-'
                            : 'ER'}
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        size="tiny"
                        icon={locked ? 'lock' : 'unlock'}
                        onClick={() => {
                            if (type === TYPE_HASH) hashAction({type: 'toggle-locked', index: index});
                            if (type === TYPE_NUMBER) hashAction({type: 'toggle-number-locked'});
                        }}
                        disabled={!url.isValid || automation.status !== 'idle'}
                        color={locked ? 'red' : null}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
    );
}
const RangeSlider = withStateSlice(SliderControl, (state, {index}) => state.values[index]);

export default RangeSlider;
export {TYPE_HASH, TYPE_NUMBER};
