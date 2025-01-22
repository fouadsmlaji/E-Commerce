import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Bars.css'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../Context/MenuContext';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT, USER } from '../../Api/Api';
import { Axios } from '../../Api/Axios';
import Cookie from "cookie-universal"

export default function TopBar() {

    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const isOpen = menu.isOpen;
    const [name, setName] = useState("");
    const cookie = Cookie();
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/${USER}`)
        .then((data) => setName(data.data.name))
        .catch(() => navigate('/login', {replace:true}));
    },[]);

     async function handleLogOut(){
        try{
           const res = await Axios.get(`/${LOGOUT}`,);
            cookie.remove('Ecookie');
            window.location.pathname= "/login";
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className='topBar'>
            <div className='BrandContainer'>
                <span style={{display: isOpen ?  'block' : 'none',}}>FOODZDASH</span>
                <FontAwesomeIcon icon = {faBars} className='BurgerMenu' cursor={'pointer'} onClick={() => setIsOpen(prev => !prev)}/>
            </div>
            <div className='d-flex gap-3 align-items-center'>
                Welcome {name}!
                <Link className='btn btn-third'to='/'> Webiste</Link>
                <button className='btn btn-primary' onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}