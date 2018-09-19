import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const ClockForm = props => {
  return (
    <Form inline bsClass="d-flex justify-content-center">
      <FormControl
        className="Deadline-input"
        placeholder="new date"
        name="newDeadline"
        onChange={event => props.handleChangeForm(event)}
      />
      <Button
        className="clock-btn"
        onClick={() => props.handleChangeDeadline()}
      >
        Change
      </Button>
    </Form>
  );
};

export default ClockForm;
