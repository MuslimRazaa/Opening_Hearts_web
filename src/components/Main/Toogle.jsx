import React from 'react'

function Toogle({ isOn, handleToggle, colorOne, colorTwo }) {
        return (
          <>
            <input
              checked={isOn}
              onChange={handleToggle}
              className="switch-checkbox"
              id={`switch`}
              type="checkbox"
            />
            <label
              style={{ background: isOn ? colorOne : colorTwo }}
              className="switch-label"
              htmlFor={`switch`}
            >
              <span className={`switch-button`} />
            </label>
          </>
        );
      };

export default Toogle
