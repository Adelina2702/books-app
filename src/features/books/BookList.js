import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faSquareCheck} from '@fortawesome/free-solid-svg-icons'
import { getContact, addContact, updateContact, deleteContact } from '../../api/contactApi'

export default function BookList() {
    const [newContact, setNewContact] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data: books
    } = useQuery('books', getContact, {
        select: data => data.sort((a,b) => b.id - a.id)
    })


    const addContactMutation = useMutation(addContact,{
        onSuccess: () => {
            queryClient.invalidateQueries("books")
        }
    })

    const updateContactMutation = useMutation(updateContact,{
        onSuccess: () => {
            queryClient.invalidateQueries("books")
        }
    })


    const deleteContactMutation = useMutation(deleteContact,{
        onSuccess: () => {
            queryClient.invalidateQueries("books")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addContactMutation.mutate({userId: 1, title: newContact, completed: false})
        setNewContact('')
    }



    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-contact'>Enter a new contact item</label>
            <div className='new-contact'>
                <input
                type="text"
                id="new-contact"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="Enter new book"
                />
            </div>
            <button className='submit'>
                <FontAwesomeIcon icon={faSquareCheck}/>
            </button>
        </form>
    )

    let content 
    if(isLoading){
        content = <p>Loading...</p>
    }else if(isError){
        content = <p>{error.message}</p>
    }else{
        content = books.map((contact) => {
            return(
                <article key={contact.id}>
                    <div className='contact'>
                        <input
                        type="checkbox"
                        checked={contact.completed}
                        id={contact.id}
                        onChange={() => 
                        updateContactMutation.mutate({...contact, completed: !contact.completed})
                        }
                        />
                        <label htmlFor={contact.id}>{contact.title}</label>
                    </div>
                    <button className='trash' onClick={() => deleteContactMutation.mutate({
                        id: contact.id
                    }) }>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </article>
            )
        })
    }

  return (
    <main>
        <h1>Books App</h1>
        {newItemSection}
        {content}
    </main>
  )
}
