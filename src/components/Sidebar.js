import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import millify from "millify";
import axios from 'axios';

export default function Sidebar({ coin }) {

  const [website, setWebSite] = useState([]);

  useEffect(() => {
    const fetchlink = async () => {
      const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coin.uuid}`, 
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h'
        },
        headers: {
          'X-RapidAPI-Key': '71d612bf2bmsh5109fad43e8bdbep186807jsnf2572bed33ac',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log("response data", response.data.data.coin.links);
        setWebSite(response.data.data.coin.links);
      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchlink here, if needed
    fetchlink();
  }, [coin]); // Empty dependency array to run only once


  
   
 
  return (
    <div className='sidebar' id='exe'>

    <h1 className='sidebar__head'>{coin.name} Value Statistics</h1>


        <div key={coin.id} className='sidebar__sidebar'>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='sidebar__bitcoin'>Price to USD</p>
          <p className='sidebar__price'>${millify(coin.price)}</p>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
          <p className='sidebar__bitcoin'>Rank</p>
          <p className='sidebar__price'>{coin.rank}</p>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
          <p className='sidebar__bitcoin'>      24h Volume </p>
          <p className='sidebar__price'>${millify(coin['24hVolume'])}</p>
          </div>
          <div className='d-flex justify-content-between align-items-center'>      
          <p className='sidebar__bitcoin'>Market Cap</p>
          <p className='sidebar__price'>${millify(coin.marketCap)}</p>
    </div>

        </div>
  
    

      <div className='sidebar__sidebar'>
      <p className='sidebar__bitcoinlinks'>{coin.name} Links</p>
      {website.map((link)=>(
      
        <a href={link.url} key={link.id} target="_blank" rel="noopener noreferrer" className='d-flex justify-content-between align-items-center  sidebar__website'>
   <p className='sidebar__bitcoin mb-0'>{link.name}</p>
   <p className='sidebar__price mb-0'>{link.type}</p>
</a>

      ))
      }
      </div>
    </div>
  )
}
