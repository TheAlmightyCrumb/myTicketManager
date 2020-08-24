import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import Ticket from './components/Ticket';
import './App.css';
import axios from 'axios';

function App() {

  const [ticketsShown, setTicketsShown] = useState();

  useEffect(() => {
    showTicketsFromServer();
  }, [])
  
  const showTicketsFromServer = async () => {
    const ticketsArray = await axios.get('http://localhost:8080/api/tickets');
    let newTicketsArray = [];
    ticketsArray.forEach(ticket => { newTicketsArray.push( <Ticket /> ) });
    setTicketsShown(newTicketsArray);
  }
  
  return (
    <main>
      {ticketsShown}
    </main>
  );
}

export default App;
