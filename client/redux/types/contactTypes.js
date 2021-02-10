export const ADD_USER_CONTACT = "ADD_USER_CONTACT";
export const GET_USER_CONTACTS = "GET_USER_CONTACTS";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const REMOVE_USER_CONTACT = "REMOVE_USER_CONTACT";
export const GET_CONTACT_INFO = "GET_CONTACT_INFO"


export const addUserContact = (contact) => {
    return {
        type: ADD_USER_CONTACT,
        contact
    }
}

export const getContacts = (contacts) => {
    return {
        type: GET_USER_CONTACTS,
        contacts
    }
}

export const updateContact = (contact) => {
    return {
        type: UPDATE_CONTACT,
        contact
    }
}

export const removeContact = (deletedContact) => {
    return {
        type: REMOVE_USER_CONTACT,
        deletedContact
    }
}

export const contactInfo = (contact) => {
    return {
        type: GET_CONTACT_INFO,
        contact
    }
}