const express = require('express');
const fs = require('fs').promises;
const url = require('url');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
    const dataJson = await fs.readFile('./data.json');
    const ticketsArray = JSON.parse(dataJson);
    const searchText = url.parse(req.url, true).query.searchText;
    if (searchText) {
        const filteredTicketsArray = ticketsArray.filter(ticket => ticket.title.toLowerCase().includes(searchText.toLowerCase()));
        res.send(filteredTicketsArray);
    } else {
    res.send(ticketsArray);
    }
})

app.post( '/api/tickets/:ticketId/done', async (req, res) => {
    let dataJson = await fs.readFile('./data.json');
    const ticketsArray = JSON.parse(dataJson);
}

 
module.exports = app;
