import PropTypes from 'prop-types';
import Contact from 'components/Contact/Contact';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <Contact
            key={contact.id}
            contact={contact}
            onDeleteContact={onDeleteContact}
          />
        );
      })}
    </ul>
  );
}
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
