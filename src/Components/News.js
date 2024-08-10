import React, { useEffect, useState} from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News =(props)=> {
const [articles,setArticles]=useState([])
const [loading,setLoading]=useState(true)
const [page,setPage]=useState(1)
const [totalResults,setTotalResults]=useState(0)
 
const capitalizefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  

    
  //   document.title = `${capitalizefirstletter(
  //     props.category
  //   )} - NewsApna`;
  // }


    const Updatenews =async () => {
        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let re = await fetch(url);
        props.setProgress(30);

        let data = await re.json();
        props.setProgress(70);
       
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);
        props.setProgress(100);
    };

    useEffect(() => {
        Updatenews();
        // eslint-disable-next-line
    }, [page]);

    const handelpreclick = async () => {
      if (page > 1) {
          setPage(page - 1);
      }
    await  Updatenews()
  };
  
  const handelnextclick = async () => {
      if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
          setPage(page + 1);
      }
     await Updatenews()
  };
  

    return (
 
        <div className="container my-3 ">
          <h4 className="text-center" style={{marginTop:"60px"}}>
            NewsApna - Top {capitalizefirstletter(props.category)}
            Headlines
          </h4>
          {loading && <Spinner />}
          <div className="row"  >
            {!loading &&
              articles.map((element) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center" key={element.url}>
                  
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imgurl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                  
                );
              })}
          </div>

          <div className="container d-flex justify-content-between">
            <button
              disabled={page <= 1}
              type="button"
              className="btn btn-dark mx-3"
              onClick={handelpreclick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                page + 1 >
                Math.ceil(totalResults / props.pageSize)
              }
              type="button"
              className="btn btn-dark mx-3"
              onClick={handelnextclick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
    
    );
  
}

// News.defaultProps = {
//   country: "in",
//   pageSize: 8,
//   category: "general",
// };

  
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apikey: PropTypes.string.isRequired,
};

export default News;
