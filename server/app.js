const express = require('express');
const fs = require('fs').promises;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
  const dataJson = await fs.readFile('./data.json');
  const ticketsArray = JSON.parse(dataJson);
  const { searchText } = req.query;
  if (searchText) {
    const filteredTicketsArray = ticketsArray.filter((ticket) => (
      ticket.title.toLowerCase().includes(searchText.toLowerCase())));
    res.send(filteredTicketsArray);
  } else {
    res.send(ticketsArray);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  let dataJson = await fs.readFile('./data.json');
  const ticketsArray = JSON.parse(dataJson);
  const doneTicketIndex = ticketsArray.findIndex((ticket) => ticket.id === req.params.ticketId);
  if (doneTicketIndex >= 0) {
    ticketsArray[doneTicketIndex].done = true;
    dataJson = JSON.stringify(ticketsArray, null, 2);
    await fs.writeFile('./data.json', dataJson);
    res.send(ticketsArray[doneTicketIndex]);
  } else {
    res.send('No Matching Ticket Id... :(');
  }
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  let dataJson = await fs.readFile('./data.json');
  const ticketsArray = JSON.parse(dataJson);
  const doneTicketIndex = ticketsArray.findIndex((ticket) => ticket.id === req.params.ticketId);
  if (doneTicketIndex >= 0) {
    ticketsArray[doneTicketIndex].done = false;
    dataJson = JSON.stringify(ticketsArray, null, 2);
    await fs.writeFile('./data.json', dataJson);
    res.send(ticketsArray[doneTicketIndex]);
  } else {
    res.send('No Matching Ticket Id... :(');
  }
});

module.exports = app;
