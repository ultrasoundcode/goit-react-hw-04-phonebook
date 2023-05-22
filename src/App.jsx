import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import FilterContact from 'components/FilterContact/FilterContact';
import styles from './App.module.css';
import { LOCALSTORAGE_KEY } from 'components/constants';

function useLocalStorage() {
  return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) ?? [];
}

export default function App() {
  const [contacts, setContacts] = useState(useLocalStorage);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const normalizedFind = newContact.name.toLowerCase();
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedFind
    );
    if (findName) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    setContacts([...contacts, newContact]);
  };

  const deleteContact = ({ id }) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={styles.phonebook}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm contacts={contacts} onAddContact={addContact} />
      <FilterContact value={filter} onChange={changeFilter} />
      <h2 className={styles.title}>Contacts</h2>
      <ContactsList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
