import React from 'react';
import PropTypes from 'prop-types';

/**
 * react class component example
 * @component
 */
class ClassComp extends React.Component {

  constructor(props) {

  }

  render() {
    return <div/>
  }
}

ClassComp.propTypes = {
  /** not required string prop */
  string: PropTypes.string,
  /** required string prop */
  stringReq: PropTypes.string.isRequired,
}

/**
 * react functional component example
 * @component
 */
function FuncComp(props) {
  return <div/>
}

FuncComp.propTypes = {
  /** bool docstring */
  bool: PropTypes.bool,
  /** obj docstring */
  obj: PropTypes.shape({}),
}



