import React from 'react';
import "./Search.css";
import { CiSearch } from "react-icons/ci";


export default function Search({handleSearch, searchTerm, handleSearchIconClick, showMore }) {
  return (
    <div className='search'>

        <h1 className='search__head'>Welcome</h1>
{showMore && <div className='search__search'>
        <CiSearch className='search__icon' onClick={handleSearchIconClick} />
            <input className='search__input' type='text' placeholder='search'  value={searchTerm}
          onChange={handleSearch} />
        </div> }
       
    </div>
  )
}
