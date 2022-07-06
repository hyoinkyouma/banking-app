import { useEffect, useState } from "react";
import CustomScroller from "react-custom-scroller";

export default function News(prop) {
  const [articles, setArticles] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async (cb) => {
      return await fetch("https://banking-app-avion.herokuapp.com/news")
        .then((data) => data.json())
        .then((dataJSON) => cb(dataJSON))
        .then((stuff) => setLoading(false));
    };
    fetchNews((data) => {
      setArticles(data.articles);
    });
  }, []);

  const Articles = (props) => {
    let x = 0;
    console.log(articles);
    const arr = [];
    props.articles.forEach((article) => {
      arr.push(
        <div key={x}>
          <hr key={x} />
          <div
            className="news-container"
            key={x + 1}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <img src={article.urlToImage} style={{ width: "100%" }}></img>
            </div>
            <div
              className="news-inner"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <a href={article.url} className="title">
                {article.title}
              </a>
              <p>{article.description}</p>
            </div>
          </div>
        </div>
      );
      x++;
    });
    return arr;
  };

  return (
    <div className="col s12 m6">
      <div className="card hoverable z-depth-3 blue-grey darken-1">
        <div className="card-content white-text">
          <h3 style={{ marginTop: "0" }}>News</h3>
          {!isLoading ? (
            <CustomScroller>
              <div style={{ height: "40vh" }}>
                <Articles articles={articles} />
              </div>
            </CustomScroller>
          ) : (
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
          )}
        </div>
        <div className="card-action"></div>
      </div>
    </div>
  );
}
