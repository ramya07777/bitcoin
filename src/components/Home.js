import React, { useEffect, useState } from 'react';
import fetchData from '../Api';
import "./Home.css";
import millify from "millify";



export default function Home() {

  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setCryptoData(data.data.data.stats);
      console.log("usefee",data);
    };

    getData();
  }, []);

  return (
  

    <div className='home'>
    
    <h1>Global Crypto Stats</h1>

    <div className='home__home' key={cryptoData.id}>
    <div className='d-flex flex-column justify-content-center align-items-center home__div'>
<p className='home__para'>Total CryptoCurrencies </p><p>{millify(cryptoData.totalCoins)}</p>
</div>
  <div className='d-flex flex-column justify-content-center align-items-center home__div'>
<p  className='home__para'>Total MarKet Cap </p><p>{millify(cryptoData.totalMarketCap)}</p>
</div>
<div className='d-flex flex-column justify-content-center align-items-center home__div'>
<p  className='home__para'>Total Markets </p><p>{millify(cryptoData.totalMarkets)}</p>
</div>
<div className='d-flex flex-column justify-content-center align-items-center home__div'>
<p  className='home__para'>Total Exchanges</p><p>{millify(cryptoData.totalExchanges)}</p>
</div>
<div className='d-flex flex-column justify-content-center align-items-center home__div'>
<p  className='home__para'>Total 24% Volume</p><p>{millify(cryptoData.total24hVolume)}</p>
</div>

</div>

    </div>
   
  )
}
