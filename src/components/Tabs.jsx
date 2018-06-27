import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Tabs extends Component {

  render() {
    return(
      <div className="Tabs d-flex justify-content-around">
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
                onClick={() => this.props.handleChange(child.key)}
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
