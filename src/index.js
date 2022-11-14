import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./style.css"
import Searchbar from "./Searchbar";
import News from "./news";

const HackerNews = () => {

    const [inputValue, setInputValue] = useState("");
    const [filtredInfo, setFiltredInfo] = useState([]);
    const [articlesInfo, setArticlesInfo] = useState([]);

    const newsIdFetch = async() => {
        const result = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
        .then((res) => res.data.slice(0,10))
        .catch((err) => alert(err));
        return result;
    }

    useEffect(() => {
        (async() => {
            const newsList = await newsIdFetch().then(async(idList) => {
                let result = [];
                for(let i = 0; i<idList.length; i++){
                    const news = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${idList[i]}.json?print=pretty`)
                    .then((res)=> res.data)
                    .catch((err) => alert(err));
                    result = [...result, news];
                }
                return result;
            });
            setArticlesInfo([...newsList]);
        })();
    },[])
    
    useEffect(() => {
        setFiltredInfo([...articlesInfo]);
    }, [articlesInfo])

    return(
        <div className="hacker-news">

            <Searchbar inputValue={inputValue} setInputValue={setInputValue}/>

            <div className="news-view">
                {
                    filtredInfo.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase())).map((element, index) => {
                        return <News key={index} articleInfo={element}/>
                    })  
                }
            </div>

        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<HackerNews/>)