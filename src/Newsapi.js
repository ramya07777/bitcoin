import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://crypto-news34.p.rapidapi.com/news/cryptonews/%7BsearchId%7D',
  headers: {
    'X-RapidAPI-Key': '71d612bf2bmsh5109fad43e8bdbep186807jsnf2572bed33ac',
    'X-RapidAPI-Host': 'crypto-news34.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log("news",response.data);
} catch (error) {
	console.error(error);
}
