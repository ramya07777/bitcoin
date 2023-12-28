import React, { useEffect, useState } from 'react';
import "./Coins.css";
import fetchData from "../Api";
import millify from "millify";
import Home from './Home';
import Search from './Search';
import Sidebar from "./Sidebar";



export default function Coins() {

const [coins, setCoins] = useState([]);
const [showMore, setShowMore] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCoin, setSelectedCoin] = useState(null);

const handleSearch = (e) => {
  setSearchTerm(e.target.value.toLowerCase());

};

 
    const handleSearchIconClick = () => {
      // Perform the data filtering logic here
      const filteredData = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoins(filteredData);
      setSearchTerm("");
    };

    useEffect(() => {
        const getData = async () => {
          const data = await fetchData();
          setCoins(showMore?(data.data.data.coins):(data.data.data.coins.slice(0, 10)));
          setSelectedCoin(data.data.data.coins[0]);
        console.log("coins", data.data.data.coins);
    };
    
        getData();
      }, [showMore]);

      const handleShowMore = () => {
        setShowMore(true);
        
    };

    const handleCoinClick = (coin) => {
      setSelectedCoin(coin);
    };


  return (
    <div className='coin__top'>
    <div className='coiin'>
  
    <Search handleSearch={handleSearch}  searchTerm={searchTerm} handleSearchIconClick={handleSearchIconClick} showMore={showMore} />
    <Home />
    <div className='coins'>
    <div className='d-flex align-items-center'>
        <p className='coins__para'>Top 10 CryptoCurrencies in the World</p>
       

 </div>
        <div className='coins___head'>
            <div>Name</div>
            <div className='d-flex  justify-content-center'>Price</div>
            <div className='d-flex  justify-content-center'>Market Cap</div>
            <div className='d-flex  justify-content-center'>Daily Change</div>
        </div>
        <a
                href="#exe"
                className="navbar__brand">
        {coins.map((coin) => (
        <div  key={coin.id} className='coins__bottom' onClick={() => handleCoinClick(coin)}>
        <div className='d-flex  align-items-center'> 
       <img className="coins__img mb-0" src={coin.iconUrl} alt='' /><p className='mb-0'>{coin.name}</p>
        </div>
        <div className='d-flex  justify-content-center'>{millify(coin.price)}</div>
        <div className='d-flex  justify-content-center'>{millify(coin.marketCap)}</div>
        <div className='d-flex  justify-content-center'> {millify(coin.change)}</div>
           </div>
        ))}
      
</a>
<div className='d-flex justify-content-end my-3'> 
 {showMore?(
          <button className='coin__button ' onClick={()=>setShowMore(false)}>View Less</button>
        ):( <button className='coin__button hy' onClick={handleShowMore}>Show More</button>)} 
    </div>
    </div>
    </div>
    <div>
    {selectedCoin && <Sidebar coin={selectedCoin} /> }
    </div>
    </div>
  )
}
