import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import './App.css';
import axios from 'axios';

function App() {

  const [ticketsShown, setTicketsShown] = useState([]);

  useEffect(() => {
    showTicketsFromServer();
  }, [])
  
  const showTickets = (ticketsArr) => {
    ticketsArr = ticketsArr.map( ticket => {
      return <Ticket key={ticket.id} ticket={ticket} handleClick={hideTicketByClick} />
    });
    return ticketsArr;
  }
  
  const showTicketsFromServer = async () => {
    let ticketsArray = await (await axios.get('/api/tickets')).data;
    console.log(ticketsArray);
    setTicketsShown(ticketsArray);
  }

  const showTicketsByTitle = async (title) => {
    let searchedTicketsArray = await (await axios.get(`/api/tickets?searchText=${title}`)).data;
    setTicketsShown(searchedTicketsArray);
  }

  const hideTicketByClick = (ticketId) => {
    let hideArr = ticketsShown.map(ticket => {
      return ticket.id === ticketId ? { ...ticket , hide: true } : ticket ; 
    });
    setTicketsShown(hideArr);
  }

  const restoreHiddenTickets = () => {
    let restoreArr = ticketsShown.map(ticket => {
      return { ...ticket , hide: false } 
    });
    setTicketsShown(restoreArr);
  }

  const visualTicketsArr = ticketsShown.filter(ticket => !ticket.hide);
  const hiddenTicketsCounter = ticketsShown.length - visualTicketsArr.length;

  return (
    <main>
      <div id='header'>
        <input 
          id='searchInput' 
          placeholder='Search Ticket...' 
          onChange={(e) => showTicketsByTitle(e.target.value)}
        />
        <section id='hidden-section'>
          <div id='restoreHideTickets' onClick={() => restoreHiddenTickets()}>Restore</div>
          <div id='hideTicketsCounter'>{hiddenTicketsCounter}</div>
          {hiddenTicketsCounter ? <div>Hidden Tickets</div> : <></>}
        </section>
      </div>
      <section id='tickets-section'>
        {showTickets(visualTicketsArr)}
      </section>
    </main>
  );
}

export default App;
