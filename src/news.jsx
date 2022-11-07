import { unixTimeConverter } from "./unixTimeConverter";

const News = ({singleArticleInfo}) => {
    return(
        <div className="article">
            <h3>
                {
                    singleArticleInfo.title
                }
            </h3>
            <p>
                <a href="#">
                    {
                        singleArticleInfo.url
                    }
                </a>
            </p>
            <div className="author">
                {
                    "By " + singleArticleInfo.by + " - "
                }
            </div>
            <div className="publication-date">
                    {
                        unixTimeConverter(singleArticleInfo.time)
                    }
            </div>
        </div>
    )
}

export default News;