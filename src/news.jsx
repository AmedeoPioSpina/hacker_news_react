import { unixTimeConverter } from "./unixTimeConverter";

const News = ({articleInfo}) => {
    return(
        <div className="article">
            <h3>
                {
                    articleInfo.title
                }
            </h3>
            <p>
                <a href="#">
                    {
                        articleInfo.url
                    }
                </a>
            </p>
            <div className="author">
                {
                    "By " + articleInfo.by + " - "
                }
            </div>
            <div className="publication-date">
                    {
                        unixTimeConverter(articleInfo.time)
                    }
            </div>
        </div>
    )
}

export default News;