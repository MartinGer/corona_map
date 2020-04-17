import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function GradientBar({
  rgbStart, rgbEnd, max, changeStatusToFraction, changeStatusToConfirmedCases, status,
}) {
  return (
    <div
      className="legend"
      style={
      {
        border: 'solid',
        borderWidth: 'thin',
        backgroundImage: `linear-gradient(to right, rgb(${rgbStart},${rgbStart},${rgbStart}), rgb(${rgbEnd},${rgbEnd},${rgbEnd}))`,
        width: '25%',
        height: '1.5%',
        position: 'absolute',
        bottom: '4%',
        right: '4%',
        zIndex: '500',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
    }
    >
      <div
        className="gradientBar"
      />
      <p style={{
        top: '110%',
        left: '0%',
        position: 'absolute',
      }}
      >
        0
      </p>
      <p style={{
        top: '110%',
        right: '0%',
        position: 'absolute',
      }}
      >
        { max }
      </p>
      <DropdownButton
        id="dropdown-item-button"
        title={status}
        className="format"
        size="sm"
        variant="secondary"
        style={{
          top: '110%',
          position: 'absolute',
        }}
      >
        <Dropdown.Item as="button"><div role="button" tabIndex={0} onClick={changeStatusToFraction} onKeyDown={changeStatusToFraction}> Percentage of Population </div></Dropdown.Item>
        <Dropdown.Item as="button"><div role="button" tabIndex={0} onClick={changeStatusToConfirmedCases} onKeyDown={changeStatusToConfirmedCases}> Confirmed Cases </div></Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

GradientBar.defaultProps = {
  rgbStart: 0,
  rgbEnd: 0,
  max: 0,
  changeStatusToFraction: null,
  changeStatusToConfirmedCases: null,
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
  changeStatusToConfirmedCases: PropTypes.func,
  status: PropTypes.string,
};
