import React, {useState} from 'react';
import {Modal, Form, Message, Button} from 'semantic-ui-react';

import {A_START, useAutomation} from '../../hooks/useAutomation';

const InitAutomation = props => {
    const {active, close} = props;

    const [, automationAction] = useAutomation();

    const [isError, setErrorState] = useState(false);
    const [isSubmitting, setSubmitState] = useState(false);

    const emptyFormData = {total: 0, wait: 2000, csv: false};
    const [formData, setFormData] = useState(emptyFormData);

    function onChange(e, v) {
        let data = v.type === 'checkbox' ? v.checked : v.value;
        setFormData(prev => ({
            ...prev,
            [v.name]: data,
        }));
    }

    function closeModal() {
        setErrorState(false);
        setSubmitState(false);
        setFormData(emptyFormData);
        close();
    }

    function handleSubmit() {
        setErrorState(false);
        setSubmitState(true);

        var t = parseInt(formData.total);
        var w = parseInt(formData.wait);
        var c = formData.csv;

        if (isNaN(t) || isNaN(w) || t < 2 || t > 10000 || w < 2000 || w > 10000) {
            setErrorState(true);
            setSubmitState(false);
            return;
        }

        closeModal();

        automationAction({
            type: A_START,
            total: t,
            doScreenshot: true,
            doCSVExport: c,
            waitTime: w,
        });
    }

    return (
        <Modal size="tiny" open={active}>
            <Modal.Header>Setup Automation</Modal.Header>
            <Modal.Content>
                <Form size="large">
                    <Form.Group widths="equal">
                        <Form.Input fluid name="total" label="Total (2-10,000)" value={formData.x} onChange={onChange} />
                        <Form.Input fluid name="wait" label="Wait (2000 - 10,000) ms" value={formData.y} defaultValue={2000} onChange={onChange} />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Checkbox toggle name="csv" label="CSV Features Report" onChange={onChange} />
                    </Form.Group>
                </Form>
                {isError ? <Message error>ERROR: Total and Wait numbers only, within ranges specified</Message> : null}
            </Modal.Content>
            <Modal.Actions>
                <Button secondary disabled={isSubmitting} onClick={closeModal}>
                    Cancel
                </Button>
                <Button primary loading={isSubmitting} disabled={isSubmitting} onClick={handleSubmit}>
                    OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default InitAutomation;
