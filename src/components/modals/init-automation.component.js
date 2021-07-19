import React, { useState } from "react";
import { Modal, Form, Message, Button } from "semantic-ui-react";

const InitAutomation = (props) => {
    const [isError, setErrorState] = useState(false);
    const [isSubmitting, setSubmitState] = useState(false);

    const emptyFormData = { x: "", y: "" };
    const [formData, setFormData] = useState(emptyFormData);

    function onChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function cancel() {
        closeModal(true);
    }

    function closeModal(isCancel) {
        setErrorState(false);
        setSubmitState(false);
        setFormData(emptyFormData);
        props.close(isCancel);
    }

    function handleSubmit() {
        setErrorState(false);
        setSubmitState(true);

        var x = parseInt(formData.x);
        var y = parseInt(formData.y);

        if (isNaN(x) || isNaN(y) || x < 10 || x > 10000 || y < 10 || y > 10000) {
            setErrorState(true);
            setSubmitState(false);
            return;
        }

        props.set(x, y);
        closeModal(false);
    }

    return (
        <Modal size="tiny" open={props.active}>
            <Modal.Header>Automate Image Capture</Modal.Header>
            <Modal.Content>
                <Form size="large">
                    <Form.Group widths="equal">
                        <Form.Input fluid name="x" label="X" value={formData.x} onChange={onChange} />
                        <Form.Input fluid name="y" label="Y" value={formData.y} onChange={onChange} />
                    </Form.Group>
                </Form>
                {isError ? <Message error>ERROR: numbers only, min 10, max 10,000</Message> : null}
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
