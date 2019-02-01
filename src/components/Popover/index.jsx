import React, { Component, Fragment } from 'react';

// Import component images
import ArrowIcon from '../../assets/arrow-rectangle.svg';

// Import component styles
import './style.css';

export default class Popover extends Component {
  constructor (props) {
    super(props);
    this.targetRef = React.createRef();
    this.popoverRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;

    if (open && !prevProps.open) {
      document.addEventListener("click", this.manageOutsideClicks);
    }

    if (!open && prevProps.open) {
      document.removeEventListener("click", this.manageOutsideClicks);
    }
  }

  togglePopover = () => {
    const { onToggle } = this.props;

    onToggle();
  };

  manageOutsideClicks = (e) => {
    const { onToggle } = this.props;
    const element = this.popoverRef.current;

    if ((e.target !== element) && (element && !element.contains(e.target))) {
      onToggle();
    }
  };

  render () {
    const { children, target, open } = this.props;

    return (
      <Fragment>
        <div ref={this.popoverRef} className="popover-container">
          <div className="popover-target" ref={this.targetRef} onClick={this.togglePopover}>
            {target}
          </div>

          <div className="popover-content" style={{ marginLeft: '-25px', display: open ? '' : 'none' }}>
            { children }
          </div>
        </div>
      </Fragment>
    );
  }
}
