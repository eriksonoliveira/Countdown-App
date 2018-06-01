import React, { Component } from 'react';

class Tabs extends Component {

  render() {
    return(
      <div className="Tabs">
        {
          //render the children
          React.Children.map(this.props.children, child => {
            let className = `tab`;
            if(child.key === this.props.active) {
              className = `${className} tab-active`;
            }
            return(
              <div
                className={className}
                onClick={() => {
                  this.props.onChange(child.key);
                }}
              >
                {child}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Tabs;
