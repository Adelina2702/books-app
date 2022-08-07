import axios from 'axios'

const contactsApi = axios.create({
    baseURL: 'http://localhost:3500'
})

export const getContact = async () => {
    const response = await contactsApi.get("/contacts")
    return response.data
}

export const addContact = async (contact) => {
    return await contactsApi.post("/contacts", contact)
}

export const updateContact = async (contact) => {
    return await contactsApi.patch(`/contacts/${contact.id}`, contact)
}

export const deleteContact = async (contact) => {
    return await contactsApi.delete(`/contacts/${contact.id}`, contact)
}

export default contactsApi;