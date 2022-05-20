import React from 'react'

const Contact = ({contact, selectContact}) => {
  return (
    <div className='contact-wrapper' onClick={() => selectContact(contact)}>
        <div className='contact'>{contact.username}</div>
    </div>
  )
}

export default Contact;