import { useState } from 'react';
import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, getItems } from 'redux/ContactsSlice';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const contacts = useSelector(getItems);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? notyf.error(`${name} is allready in phonebook`)
      : dispatch(
          addContacts(newContact),
          notyf.success(`Contact ${name} added`)
        );

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  const changeName = e => setName(e.target.value);
  const changeNumber = e => setNumber(e.target.value);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor={nameInputId} className={styles.lable}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={changeName}
          id={nameInputId}
          placeholder="Enter name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </label>
      <label htmlFor={numberInputId} className={styles.lable}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={changeNumber}
          id={numberInputId}
          placeholder="Enter number..."
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </label>

      <button
        disabled={!name || !number}
        className={styles.button}
        type="submit"
      >
        Add contact
      </button>
    </form>
  );
}
