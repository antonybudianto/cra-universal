import React from 'react';
import PropTypes from 'prop-types';

export class ContextProvider extends React.Component {
  static childContextTypes = {
    insertCss: PropTypes.func
  };

  getChildContext() {
    return { ...this.props.context };
  }

  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(children, props);
  }
}
