import React, {useEffect, useState} from 'react';
import {Button, Modal, Progress, Icon} from 'semantic-ui-react';

import {useHash} from '../../hooks/useHash';
import {useAutomation} from '../../hooks/useAutomation';

import {screenshot} from '../../helpers/screenshot';

const RunAutomation = () => {
    const [hash, hashAction] = useHash();
    const [automation, automationAction] = useAutomation();

    const msg_gen = 'Generating Hashes';
    const msg_fin = 'Finishing Export';

    const [isSubmitting, setSubmitState] = useState(false);
    const [message, setMessage] = useState(msg_gen);

    const [runner, setRunner] = useState(null);

    useEffect(() => {
        if (automation.status === 'active' && runner === null) {
            hashAction({type: 'random'});
            setRunner(
                setInterval(() => {
                    automationAction({
                        type: 'tick',
                    });
                }, automation.waitTime),
            );
        }
    }, [automation.status]);

    useEffect(() => {
        if (automation.status === 'idle' && isSubmitting === true) {
            setSubmitState(false);
        }
    }, [automation.status]);

    useEffect(() => {
        if (automation.status === 'active') {
            if (automation.tick > 0 && automation.tick <= automation.total) {
                if (message !== msg_gen) setMessage(msg_gen);

                if (automation.doScreenshot) {
                    screenshot(hash.hash);
                }

                // if doCSVExport, capture features.... !!!
            }

            if (automation.tick === automation.total) {
                automationAction({type: 'stop'});
            } else {
                hashAction({type: 'random'});
            }
        }
    }, [automation.status, automation.tick]);

    useEffect(() => {
        if (automation.status === 'stopping') {
            clearInterval(runner);
            setRunner(null);

            if (message !== msg_fin) setMessage(msg_fin);

            // if doCSVExport, wait and gather features into CSV

            setTimeout(() => {
                automationAction({type: 'reset'});
            }, 500);
        }
    }, [automation.status]);

    return (
        <Modal size="tiny" open={automation.status === 'active' || automation.status === 'stopping'}>
            <Modal.Header>Running Automation</Modal.Header>
            <Modal.Content>
                <Progress percent={automation.progress} progress indicating>
                    {message}
                </Progress>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={() => {
                        setSubmitState(true);
                        setMessage(msg_fin);
                        automationAction({type: 'stop'});
                    }}
                >
                    <Icon name="cancel" />
                    Stop
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default RunAutomation;
