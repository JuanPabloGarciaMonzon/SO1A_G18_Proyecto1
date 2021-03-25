  
import React from 'react'

const Contacts = ({contacts}) => {
    return (
        <div>
            <center><h1 id='title'>Contact List</h1>
            <div>
            <table id='students'>
            <td>nombre</td>
                <td>ubicación</td>
                <td>edad</td>
                <td>tipo infectado</td>
                <td>estado</td>
                {contacts.map((contact) => (
                    <tr>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                    </tr>
                ))}
            </table>
            </div>
        </center>
        </div>
    )
};

export default Contacts