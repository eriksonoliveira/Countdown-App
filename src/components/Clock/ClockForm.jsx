import React from "react";

const ClockForm = props => {
  return (
    <form className="d-flex justify-content-center">
      <input
        type="text"
        className="deadline-input"
        placeholder="New date"
        name="newDeadline"
        onChange={event => props.handleChangeForm(event)}
      />
      <button
        className="clock-btn"
        type="button"
        onClick={() => props.handleChangeDeadline()}
      >
        CHANGE
      </button>
    </form>
  );
};

export default ClockForm;
