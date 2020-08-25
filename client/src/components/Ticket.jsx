import React from 'react'

function Ticket({ticket, handleClick}) {

    const showLabel = (ticket) => {
        return (
            ticket.labels.map(label => <div key={label} className='label'>{label}</div>)
        );
    }

    return (
        // <>
        // {ticket.labels && (
        <div className='ticket'>
            <button
                className='hideTicketButton' 
                onClick={() => handleClick(ticket.id)}
            >Hide</button>
            id: {ticket.id}, <br />
            title: {ticket.title} <br />
            created at: { ticket.creationTime}<br/>
            mail: {ticket.userEmail}<br/>
            content: {ticket.content} <br/>
            {ticket.labels && <div>labels: {showLabel(ticket)}</div>} 
            <br /> 
        </div>
        // )}
        // </>
    )
}

export default Ticket;