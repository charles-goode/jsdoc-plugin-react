import React from 'react';
import PropTypes from 'prop-types';

/**
 * react functional component example
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

export default FuncComp;

