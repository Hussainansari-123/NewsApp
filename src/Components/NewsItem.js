import React from "react";

const NewsItem=(props)=> {
  
    let { title, description, imgurl, newsUrl, url, author, date, source } =
      props;
    return (
      <div className="my-3 " >
        <div className="card" style={{ width: "16rem" }}>
          <span
            className="position-absolute  translate-middle badge text-bg-danger "
            style={{ left: "8vh", zIndex: 1 }}
          >
            {source}
          </span>
          <img
            src={
              !imgurl
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvyIxwOTBEAt5rJgPtBqfOvNbCqSuwUK1KQ&usqp=CAU"
                : imgurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" key={url}>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-dark">
                By {author === null ? "unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              className="btn btn-sm btn-dark "
              target="_blank"
              rel="noreferrer"
            >
              Readmore
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
