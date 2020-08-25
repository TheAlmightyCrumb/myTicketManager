import React from 'react'

function Ticket({ticket, handleClick}) {

    const showLabel = (ticket) => {
        return (
            ticket.labels.map(label => <div key={label} className='label'>{label}</div>)
        );
    }

    const showFullDate = (ms) => {
        const createdAt = new Date(ms);
        return `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()} 
        ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
    }

    return (
        <div className='ticket'>
            <button
                className='hideTicketButton' 
                onClick={() => handleClick(ticket.id)}
            >Hide</button>
            id: {ticket.id}, <br />
            title: {ticket.title} <br />
            created at: {showFullDate(ticket.creationTime)}<br/>
            mail: {ticket.userEmail}<br/>
            content: {ticket.content} <br/>
            {ticket.labels && <div>labels: {showLabel(ticket)}</div>} 
            <br /> 
        </div>
    )
}

export default Ticket;