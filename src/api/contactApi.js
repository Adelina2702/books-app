import axios from 'axios'

const booksApi = axios.create({
    baseURL: 'http://localhost:3500/'
})

export const getContact = async () => {
    const response = await booksApi.get("/books")
    return response.data
}

export const addContact = async (contact) => {
    return await booksApi.post("/books", contact)
}

export const updateContact = async (contact) => {
    return await booksApi.patch(`/books/${contact.id}`, contact)
}

export const deleteContact = async (contact) => {
    return await booksApi.delete(`/books/${contact.id}`, contact)
}

export default booksApi;