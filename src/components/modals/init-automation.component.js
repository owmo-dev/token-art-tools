import React, { useState } from "react";
import { Modal, Form, Message, Button } from "semantic-ui-react";

const InitAutomation = (props) => {
    const { active, close } = props;

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
        close(r, c, w);
    }

    function handleSubmit() {
        setErrorState(false);
        setSubmitState(true);

        var c = parseInt(formData.count);
        var w = parseInt(formData.wait);

        if (isNaN(c) || isNaN(w) || c < 2 || c > 1000 || w < 1000 || w > 10000) {
            setErrorState(true);
            setSubmitState(false);
            return;
        }

        closeModal(true, c, w);
    }

    return (
        <Modal size="small" open={active}>
            <Modal.Header>Automatic Random Images</Modal.Header>
            <Modal.Content>
                <Form size="large">
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            name="count"
                            label="Image Count (2-1000)"
                            value={formData.x}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            name="wait"
                            label="Wait in ms / image (1000 - 10,000)"
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
