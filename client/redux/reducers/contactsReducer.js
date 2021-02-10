import {
  ADD_USER_CONTACT,
  UPDATE_CONTACT,
  REMOVE_USER_CONTACT,
  GET_USER_CONTACTS,
  GET_CONTACT_INFO
} from '../types/contactTypes';

const initialState = {
  contacts: [],
  selectedContact: []
};

export function contactsReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_USER_CONTACT:
      return {
        ...state,
        contacts: action.contact,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => {
          if (contact.alias === action.contact.alias)
            return action.contact;
          return contact;
        })
      };
    case REMOVE_USER_CONTACT:
      return {
        ...state,
        contacts: action.deletedContact,
      };
    case GET_USER_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };

    case GET_CONTACT_INFO:
      return {
        ...state,
        selectedContact: action.contact,
      };

    default:
      return state;
  }
}