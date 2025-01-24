
import TopBar from '../../Components/Dashboard/TopBar'

export default function HomePage() {


    return(
        <div style={{height:'100vh'}}>
            <TopBar/>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100%'  }}>
                <h1 className='display-1'>This is the homepage</h1>
            </div>
        </div>
    )
}