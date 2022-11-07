import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import News from "./news";

const HackerNews = () => {

    const [articlesInfo, setArticlesInfo] = useState([])

    const newsIdFetch = async() => {
        const result = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
        .then((res) => res.data.slice(0,10))
        .catch((err) => alert(err));
        return result;
    }

    const newsFetch = async(id) => {
        const result = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then((res) => res.data)
        .catch((err) => alert(err));
        return result;
    }


    useEffect(async() => {
        const newsId = await newsIdFetch();
        newsId.map(async(element) => {
            const newsList = await newsFetch(element);
            setArticlesInfo(prev => [...prev, newsList]);
        })
    },[])

    //Da levare alla fine vvv

    useEffect(() => {
        console.log(articlesInfo)
    },[articlesInfo])

    return(
        <div className="hacker-news">
            {
                articlesInfo.map((element, index)=>{
                    return <News key={index} singleArticleInfo={element}/>
                })
            }
        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<HackerNews/>)