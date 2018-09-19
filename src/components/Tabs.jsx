import React from "react";

const Tabs = props => {
  return (
    <div className="Tabs d-flex justify-content-around">
      {// render the children
      // First argument of 'React.Children.map' is the children array and the second, the callback function
      // Documentation: https://reactjs.org/docs/react-api.html#reactchildren
      React.Children.map(props.children, child => {
        let className = "tab";
        // Add class 'tab-active' to the active tab
        className += child.key === props.active ? " tab-active" : "";

        return (
          <div
            className={className}
            onClick={() => props.handleChange(child.key)}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
