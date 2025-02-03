
import { Link } from 'react-router-dom'
import './404.css'

export default function Error404() {

    return(
        <div className='Error404Container container'>
            <h1>OOPS!</h1>
            <p>Error 404, Page Not Found.</p>
            <Link to='/' className='btn border-black '>Go To HomePage</Link>
        </div>
    )
}