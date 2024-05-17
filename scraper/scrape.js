const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeComics() {
	const url = `https://www.thefarside.com/`;
	const { data } = await axios.get(url);

	const $ = cheerio.load(data);

	const results = {
		comics: [],
	};

	results.date = $('.tfs-content__1col > h3')
		.text()
		.replace('Comic Collections', '');

	$('.card-body').each((_, elem) => {
		const image = $(elem).find('.tfs-comic__image > img').attr('data-src');
		const caption = $(elem)
			.find('.figure-caption')
			.text()
			.replace('\n', '')
			.trim();

		results.comics.push({ image, caption });
	});

	return results;
}

module.exports = {
	scrapeComics,
};
