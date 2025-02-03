import axios from "axios"
import { useEffect } from "react"
import { baseURL, GOOGLE_CALL_BACK } from "../../../../Api/Api"
import { useLocation } from "react-router-dom"
import Cookie from "cookie-universal"

export default function GoogleCallBack() {

    const cookie = Cookie();
    const location = useLocation();

    useEffect (() => {
        async function GoogleCall(){
            try {
             const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location. search}`);
            
             const token  = res.data.access.token;
             cookie.set("Ecookie", token);

            } catch (err) {
                console.log(err)
            }
        }   
        GoogleCall(); 
    },[])

    return(
        <>
    <h1>lolqti</h1>
        </>
    )
}