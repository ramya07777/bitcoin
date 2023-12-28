
import axios from 'axios';

const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      headers: {
        'X-RapidAPI-Key': '71d612bf2bmsh5109fad43e8bdbep186807jsnf2572bed33ac',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      return response;
    } catch (error) {
      console.error(error);
    }
  };


  export default fetchData;