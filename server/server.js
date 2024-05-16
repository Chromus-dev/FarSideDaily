const express = require('express');
const { scrapeComics } = require('./scrape.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	scrapeComics()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
