import React, { useState } from 'react';
import "./Header.css";
import Logo from "../components/Logo.png";
import { MdOutlineHome } from "react-icons/md";
import { GrCurrency } from "react-icons/gr";
import { RiExchangeBoxFill } from "react-icons/ri";
import { LuNewspaper } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";


export default function Header() {


  const [navbarExpanded, setNavbarExpanded] = useState(false);

    const filterHandler = () => {
    setNavbarExpanded(!navbarExpanded);

    if (!navbarExpanded && window.innerWidth <= 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }
  };

  const handleNavLinkClick = () => {
    setNavbarExpanded(false);
    document.body.style.overflow = "auto";
  };
  
  return (
    
    <div className='header'>
    <div className='expand'>
     <Link to={"/"} className="navbar__brand nav__img">
        <img className="mb-4 head__img" src={Logo} alt='' />
        </Link>
        <IoMdMenu  onClick={filterHandler} className="menu" /></div>
        <div className='header__header mt-5'>
        <div className={`${navbarExpanded ? "open" : "filterComponent "}`}>
        <Link to={"/"} className="navbar__brand" onClick={handleNavLinkClick}>
        <div className='d-flex  align-items-center header__text'><MdOutlineHome className='fs-2 me-4 font' /><h1 className='fs-2 mb-0 font'>Home</h1></div>
        </Link>
        <Link to={"/crypto"} className="navbar__brand" onClick={handleNavLinkClick}>
        <div className='d-flex  align-items-center  header__text'> <GrCurrency  className='fs-2 me-4 font' />     <h1 className='fs-2 mb-0 font'>Cryptocurrencies</h1> </div>
        </Link>
      
        <div className='d-flex  align-items-center  header__text' onClick={handleNavLinkClick}>  <RiExchangeBoxFill className='fs-2 me-4 font' /> <h1 className='fs-2 mb-0 font'>Exchanges</h1></div>
     
        <Link to={"/new"} className="navbar__brand" onClick={handleNavLinkClick}>
        <div className='d-flex  align-items-center header__text'> <LuNewspaper  className='fs-2 me-4 font' /><h1 className='fs-2 mb-0 font'>News</h1>
        </div>
        </Link> 
        </div>
        </div>
    </div>
  )
}
