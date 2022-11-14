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
    const [newslist, setNewsList] = useState([]);

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
        const pippo = newsId.map(async(element) => {
            const newsList = await newsFetch(element);
            setArticlesInfo(prev => [...prev, newsList]);
        })
    },[])
    
    useEffect(() => {
        setFiltredInfo([...articlesInfo]);
    }, [articlesInfo])

    useEffect(() => {
        if(inputValue!==""){
            let filtredResult = [];
            articlesInfo.map(element => {
                if(element.title.search(inputValue) !== -1 ){
                    filtredResult = [...filtredResult, element];
                }
            })
            setFiltredInfo(...filtredResult);
            console.log(inputValue)
        }
    }, [inputValue])

    useEffect(()=>{
        filtredInfo.map((element, index)=>{
            setNewsList(prev => prev.push(<News key={index} singleArticleInfo={element}/>))
        })
    },[filtredInfo])

    useEffect(() => {
        console.log(articlesInfo)
        console.log(filtredInfo)
    },[filtredInfo])

    return(
        <div className="hacker-news">

            <Searchbar inputValue={inputValue} setInputValue={setInputValue}/>

            <div className="news-view">
                {
                    newslist.map(element => {
                        return element
                    })  
                }
            </div>

        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<HackerNews/>)