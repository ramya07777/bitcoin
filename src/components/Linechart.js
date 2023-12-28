import React, { useEffect, useState } from 'react';
import "./LineChart.css";
import fetchData from '../Api';
import axios from 'axios';
import Chartgraph from './Chartgraph';
import millify from 'millify';

export default function Linechart() {

    const [select, setSelect] = useState('');
    const [line, setLine] = useState([]);
 const [chart, setChart] = useState([]);
 const [history, setHistory] = useState([]);
 const [timePeriod, setTimePeriod] = useState('24h'); 


 useEffect(() => {
  const getData = async () => {
    const data = await fetchData();
    setLine(data.data.data.coins);
       };

  getData();
}, []);

 useEffect(() => {
  const fetchDataFromApi = async () => {
    const selectedCoin = line.find((coin) => coin.name === select);
    const url = select
      ? `https://coinranking1.p.rapidapi.com/coin/${selectedCoin.uuid}`
      : `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd`;

    const options = {
      method: 'GET',
      url: url,
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
      },
      headers: {
        'X-RapidAPI-Key': '71d612bf2bmsh5109fad43e8bdbep186807jsnf2572bed33ac',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setChart(response.data.data.coin);
      console.log("slect",response.data.data.coin)
    } catch (error) {
      console.error(error);
      setChart([]);
    }
  };

  fetchDataFromApi();
}, [select, line]);


useEffect(() => {
  const fetchHistoryData = async () => {
    const selectedCoin = line.find((coin) => coin.name === select);
    const historyUrl = select
      ? `https://coinranking1.p.rapidapi.com/coin/${selectedCoin.uuid}/history`
      : `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history`;

    const options = {
      method: 'GET',
      url: historyUrl,
      params: {
        timePeriod: timePeriod,
      },
      headers: {
        'X-RapidAPI-Key': '71d612bf2bmsh5109fad43e8bdbep186807jsnf2572bed33ac',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const historyResponse = await axios.request(options);
      setHistory(historyResponse.data.data.history);
    } catch (error) {
      console.error(error);
      setHistory([]);
    }
  };

  fetchHistoryData();
}, [select, line, timePeriod]);




    


  
    return (
      <div className='line__top'>
      <div className='me-5 line'>

       <div className='d-flex align-items-center justify-content-center my-5 graph'>
      <h3 className='line__head'>Price Chart for {chart.name}</h3>
      <h3 className='line__head'>Change: {chart.change}%</h3>
      <h3 className='line__head'>Current {chart.name} price ${millify(chart.price)}</h3>
      </div>


      <div className='d-flex align-items-center m-5 flex-wrap line__chart'>
        <div className='line__header'>
                <select className='line__button' value={select} 
        onChange={(e) => {
   setSelect(e.target.value);
   const selectedCoin = line.find((coin) => coin.name === e.target.value);
  console.log("Selected coin icon URL:", selectedCoin.iconUrl);
  }} >
             {line.map((coin) => (
    <option key={coin.id} value={coin.name}>
    {/* <img
        className='icon__linegraph'
        src={coin.iconUrl}
        alt=""
      /> */}
      <span>{coin.symbol}</span>
    </option>
  ))}
 </select>
        </div>
     


        <div className='time-period-buttons'>
    <button
      className={`line__butt ${timePeriod === '3h' ? 'active' : ''}`}
      onClick={() => setTimePeriod('3h')}
    >
      3h
    </button>
    <button
      className={`line__butt ${timePeriod === '24h' ? 'active' : ''}`}
      onClick={() => setTimePeriod('24h')}
    >
      24h
    </button>
    <button
      className={`line__butt ${timePeriod === '7d' ? 'active' : ''}`}
      onClick={() => setTimePeriod('7d')}
    >
     7d
    </button>
    <button
      className={`line__butt ${timePeriod === '30d' ? 'active' : ''}`}
      onClick={() => setTimePeriod('30d')}
    >
     30d
    </button>
    <button
      className={`line__butt ${timePeriod === '3m' ? 'active' : ''}`}
      onClick={() => setTimePeriod('3m')}
    >
     3m
    </button>
    <button
      className={`line__butt ${timePeriod === '1y' ? 'active' : ''}`}
      onClick={() => setTimePeriod('1y')}
    >
     1y
    </button>
    <button
      className={`line__butt ${timePeriod === '3y' ? 'active' : ''}`}
      onClick={() => setTimePeriod('3y')}
    >
     3y
    </button>
    <button
      className={`line__butt ${timePeriod === '5y' ? 'active' : ''}`}
      onClick={() => setTimePeriod('5y')}
    >
     5y
    </button>
  </div>

      </div>

      
       <Chartgraph chart={chart} history={history} />
                
      </div>
      </div>
    );
  }