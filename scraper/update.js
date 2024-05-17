const core = require('@actions/core');
const github = require('@actions/github');

const { scrapeComics } = require('./scrape.js');

scrapeComics()
	.then((result) => {
		res.send(result);
	})
	.catch((err) => console.log(err));

try {
	scrapeComics()
		.then((result) => {
			// set output
			core.setOutput('comicsDate', result.date);
			core.setOutput('comicsJSON', result);

			// Get the JSON webhook payload for the event that triggered the workflow
			const payload = JSON.stringify(
				github.context.payload,
				undefined,
				2
			);
			console.log(`The event payload: ${payload}`);
		})
		.catch((err) => {
			throw err;
		});
} catch (error) {
	core.setFailed(error.message);
}
