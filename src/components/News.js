import React, { useEffect, useState } from 'react';
import "./News.css";
import fetchData from '../Api';
import axios from 'axios';

export default function News() {

    const [news, setNews] = useState([]);
const [selectedCoin, setSelectedCoin] = useState('cryptonews');
const [selectedCoinNews, setSelectedCoinNews] = useState([]);
const [more, setMore] = useState(false);

    useEffect(() => {
        const getData = async () => {
          const data = await fetchData();
          setNews(data.data.data.coins);       
           };
    
        getData();
      }, []);

const newsChange = (e) =>{
  setSelectedCoin(e.target.value);
  console.log("value",e.target.value);
}


useEffect(() => {
  const fetchNewsForSelectedCoin = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: selectedCoin,
            apiKey: '8ef08ba8894d48c189ce9251bd5c204f',
          },
        });
  
         
          console.log('news', response.data.articles);
          setSelectedCoinNews(more?(response.data.articles):(response.data.articles.slice(0, 5)));
          // Update state or perform other actions with the fetched news data
      } catch (error) {
          console.error(error);
      }
  };

  fetchNewsForSelectedCoin();
}, [more, selectedCoin]);


  return (

    <div className='news__news'>
 
 
          <div className='article'>
          <div className='d-flex align-items-center end'>
            <h2 className='news__head mb-0'>News for {selectedCoin}</h2>
           
<select  className='news__button' value={selectedCoin} onChange={newsChange}>
<option value="cryptonews">cryptonews</option>
{news.map((coin)=>(
    <option key={coin.id} value={coin.name}>{coin.name}</option>
))}
</select>



    </div>
          {selectedCoinNews?.map((article) => (
              <a href={article.url} target="_blank" rel="noopener noreferrer" key={article.id} className='news__link'>
              <div key={article.id} className='w-100 news__article'>
       
                <p className='mb-0 article__title'>{article.title}</p>

                <div className='d-flex align-items-center'>
                <p className='mb-0 me-2 article__para'>{article.description}</p>
                <img className='article__image ' src={article.urlToImage} alt='' />
                </div>
                </div>
              </a>
            ))
         }
          </div>
          <div className='d-flex justify-content-end my-3 show'>
          {more?(
          <button className='news__button' onClick={()=>setMore(false)}>View Less</button>
        ):( <button className='news__button' onClick={()=>setMore(true)}>Show More</button>)} 
        </div>
    </div>
  )
}
