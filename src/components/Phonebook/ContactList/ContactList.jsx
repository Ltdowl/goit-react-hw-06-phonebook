import React from 'react';
import PropTypes from 'prop-types';
import { ContactListElement } from './ContactListElement';

export function ContactList({ findContact, deleteContact }) {
  return (
    <ul style={{ padding: 0, }}>
      {findContact().map(({ id, name, number }) => {
        return (
          <ContactListElement
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  findContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};