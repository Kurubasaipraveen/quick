// src/components/Dropdown.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Info, UserCircle } from '@phosphor-icons/react';
import './Dropdown.css';

const Dropdown = ({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(activeItemIndex);

  const toggleDropdown = () => {
    if (status !== 'Disabled') {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${status.toLowerCase()}`}>
      {labelVisibility === 'Visible' && (
        <label>
          {labelIconVisibility === 'Visible' && <Info />}
          {label}
        </label>
      )}
      <div className="dropdown-container" onClick={toggleDropdown}>
        {leftIconVisibility === 'Visible' && <UserCircle />}
        <input
          type="text"
          value={selectedIndex >= 0 ? items[selectedIndex] : text}
          readOnly
          required={required === 'Yes'}
          disabled={status === 'Disabled'}
        />
      </div>
      {isOpen && (
        <ul className={`dropdown-menu ${type.toLowerCase()}`}>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(index)}>
              {type === 'SingleRadio' && <input type="radio" checked={selectedIndex === index} readOnly />}
              {type === 'Multi' && <input type="checkbox" checked={selectedIndex === index} readOnly />}
              {item}
            </li>
          ))}
        </ul>
      )}
      {helperText && <small>{helperText}</small>}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  labelVisibility: PropTypes.oneOf(['Visible', 'Hidden']).isRequired,
  status: PropTypes.oneOf(['Unfilled', 'Filled', 'Disabled', 'Error']).isRequired,
  labelIconVisibility: PropTypes.oneOf(['Visible', 'Hidden']).isRequired,
  leftIconVisibility: PropTypes.oneOf(['Visible', 'Hidden']).isRequired,
  helperText: PropTypes.string.isRequired,
  required: PropTypes.oneOf(['Yes', 'No']).isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['SingleNoIcon', 'SingleRadio', 'Multi']).isRequired,
  activeItemIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
