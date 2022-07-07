import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import styles from './Phonebook.module.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export function Phonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('contacts'));
    if (localState) {
      setContacts(localState);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = data => {
    if (!hasContact(data.name)) {
      setContacts(prevState => [...prevState, data]);
      notyf.success(`Contact ${data.name} added`);
    } else {
      notyf.error(`${data.name} is allready in phonebook`);
    }
  };

  const hasContact = name => {
    return contacts.find(contact => {
      return contact.name.toLocaleLowerCase() === name.toLocaleLowerCase();
    });
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const findContact = () => {
    if (filter.length) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    }
    return contacts;
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contacts => !contacts.id.includes(contactId)));
    notyf.success(`Contact deleted`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />

      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList findContact={findContact} deleteContact={deleteContact} />
    </div>
  );
}

const notyf = new Notyf();
