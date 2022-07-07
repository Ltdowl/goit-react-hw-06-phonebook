import React from 'react';
import PropTypes from 'prop-types';

export const ContactListElement = ({ id, name, number, onDeleteContact }) => {
  return (
    <li
      style={{
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px dotted black',
      }}
    >
      {name}: {number}
      <button
        style={{ marginLeft: '5px', cursor: 'pointer' }}
        type="submit"
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListElement.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
