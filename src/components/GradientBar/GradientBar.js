import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownButton } from 'react-bootstrap';

import './GradientBar.css';

export default function GradientBar({
  rgbStart, rgbEnd, max, changeStatusToFraction, changeStatusToInfectedCases, status,
}) {
  return (
    <div
      className="legend"
      style={{ backgroundImage: `linear-gradient(to right, rgb(${rgbStart}, ${rgbStart}, ${rgbStart}), rgb(${rgbEnd}, ${rgbEnd}, ${rgbEnd}))` }}
    >
      <p className="legendPart left">
        0
      </p>
      <p className="legendPart right">
        { max.toLocaleString() }
      </p>
      <DropdownButton
        id="dropdown-item-button"
        title={status}
        className="legendPart"
        size="sm"
        variant="secondary"
      >
        <Dropdown.Item as="button"><div role="button" tabIndex={0} onClick={changeStatusToFraction} onKeyDown={changeStatusToFraction}> Infected Percentage of Population </div></Dropdown.Item>
        <Dropdown.Item as="button"><div role="button" tabIndex={0} onClick={changeStatusToInfectedCases} onKeyDown={changeStatusToInfectedCases}> Confirmed Infections </div></Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

GradientBar.defaultProps = {
  rgbStart: 0,
  rgbEnd: 0,
  max: 0,
  changeStatusToFraction: null,
  changeStatusToInfectedCases: null,
  status: '',
};

GradientBar.propTypes = {
  rgbStart: PropTypes.number,
  rgbEnd: PropTypes.number,
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  changeStatusToFraction: PropTypes.func,
  changeStatusToInfectedCases: PropTypes.func,
  status: PropTypes.string,
};
