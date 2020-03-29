import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.selected ? '15px' : '12px'};
  height: ${props => props.selected ? '15px' : '12px'};
  background-color: ${props => props.selected ? '#808080' : ((props.type === 'REQUEST') ? '#3498e1' : '#3fb94c')};
  border-radius: ${props => (props.type === 'REQUEST') ? '10%' : '50%'};
  user-select: none;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = props => (
  <Wrapper
    alt={props.text}
    type={props.text}
    selected={props.selected}
    {...props.onClick ? { onClick: props.onClick } : {}}
  />
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;