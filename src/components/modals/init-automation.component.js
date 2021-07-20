import React, { useState } from "react";
import { Modal, Form, Message, Button } from "semantic-ui-react";

const InitAutomation = (props) => {
    const [isError, setErrorState] = useState(false);
    const [isSubmitting, setSubmitState] = useState(false);

    const emptyFormData = { count: 0, wait: 0 };
    const [formData, setFormData] = useState(emptyFormData);

    function onChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function cancel() {
        closeModal(false, 0, 0);
    }

    function closeModal(r, c, w) {
        setErrorState(false);
        setSubmitState(false);
        setFormData(emptyFormData);
        props.close(r, c, w);
    }

    function handleSubmit() {
        setErrorState(false);
        setSubmitState(true);

        var c = parseInt(formData.count);
        var w = parseInt(formData.wait);

        if (isNaN(c) || isNaN(w) || c < 1 || c > 1000 || w < 100 || w > 10000) {
            setErrorState(true);
            setSubmitState(false);
            return;
        }

        closeModal(true, c, w);
    }

    return (
        <Modal size="tiny" open={props.active}>
            <Modal.Header>Generate Random Hash Images</Modal.Header>
            <Modal.Content>
                <Form size="large">
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            name="count"
                            label="Image Count (1-1000)"
                            value={formData.x}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            name="wait"
                            label="Wait in ms / image (100 - 10,000)"
                            value={formData.y}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Form>
                {isError ? <Message error>ERROR: Count and Wait numbers only, within ranges specified</Message> : null}
            </Modal.Content>
            <Modal.Actions>
                <Button secondary disabled={isSubmitting} onClick={cancel}>
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
