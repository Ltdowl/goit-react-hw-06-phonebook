import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import styles from './Phonebook.module.css';

export function Phonebook() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm />

      <h2 className={styles.title}>Contacts</h2>
      <Filter />

      <ContactList />
    </div>
  );
}
