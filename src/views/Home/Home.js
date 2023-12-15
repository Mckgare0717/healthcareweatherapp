import "./Home.css"

const Home=()=>{

    const location = navigator.geolocation.getCurrentPosition(success)
    
    
    function success(position){
        const latitude = position.coords.latitude
    }


    return(
        <div className="main-cont">
            Welcome to Home page
        </div>
    )
}


export default Home;