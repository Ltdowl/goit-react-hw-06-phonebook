import React from 'react';

import { ContactListElement } from './ContactListElement';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, getFilter, deleteContacts } from 'redux/ContactsSlice';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export function ContactList() {
  const contacts = useSelector(getItems);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDeleteContact = contactId =>
    dispatch(deleteContacts(contactId), notyf.success(`Contact deleted`));

  const filterList = () => {
    const normalValue = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalValue)
    );
  };

  return (
    <ul style={{ padding: 0 }}>
      {filterList().map(({ id, name, number }) => {
        return (
          <ContactListElement
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={handleDeleteContact}
          />
        );
      })}
    </ul>
  );
}
