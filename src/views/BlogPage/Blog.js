import "./Blog.css"
import Sectionheading from "../../components/Section Heading/SectionHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import { TitleTab } from "../../components/TitleTab";

const Blog = () => {
    TitleTab("Health Advice Group | Blog")
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_KEY = "f38da1927783f2c2f89896fd09011d11"

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getNews(latitude, longitude)
                        setLoading(false)
                    },
                    (error) => {
                        setError("Error getting location: " + error.message);
                        setLoading(false)
                    }
                );
            } else {
                setError("Geolocation is not supported by your browser");
                setLoading(false)
            }
        };

        const getNews = async (latitude, longitude) => {


            const locApi = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`)
            const country = locApi.data[0].country.toLowerCase()
            const newsApi = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_37085a679b0b368446e05a376d142366f477a&q=weather&country=${country}`)
            setNews(newsApi.data.results)

        }

        getLocation()

    }, [])


    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="blog-cont">
            <Sectionheading text="Blog" />
            <div className="article-cont">

                {
                    news.map((item) => {
                        return <div>
                            <div class="card card-1">
                                <div class="card-img"></div>
                                <a href={item.link} class="card-link" target="_blank">
                                    <div class="card-img-hovered" style={{ backgroundImage: `url(${item.image_url})` }}></div>
                                </a>
                                <div class="card-info">
                                    <div class="card-about">
                                        <div class="card-time">{item.pubDate}</div>
                                    </div>
                                    <h1 class="card-title"><a href={item.link} target="_blank">{item.title}</a></h1>
                                    {item.creator ? <div class="card-creator">by <a href="">{item.creator}</a></div> : <div class="card-creator">by<a href="">unknown</a></div>}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}


export default Blog;