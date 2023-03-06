import { useState, useEffect } from "react";
import styled from "styled-components";

// import { News } from "../components";
import { NewsFeed, PostNews } from "../components";

const API_KEY = process.env.REACT_APP_FAKE_NEWS_API_KEY;

const Home = () => {
  let i = 0;
  const [news, setNews] = useState(null);
  const [userNews, setUserNews] = useState(null);

  const [isPosted, setIsPosted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fakeNewsUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;
  const usersNewsUrl = "/api/get-news";

  useEffect(() => {
    const newsFetch = async () => {
      const result = (
        await Promise.all([fetch(fakeNewsUrl), fetch(usersNewsUrl)])
      ).map((res) => res.json());

      const [dataNewsFake, dataNewsUser] = await Promise.all(result);

      //   const allNews = dataNewsFake.articles.concat(dataNewsUser.data);
      const allNews = dataNewsUser.data.concat(dataNewsFake.articles);

      setNews(allNews);
      setUserNews(dataNewsUser.data);
    };

    newsFetch();
  }, [fakeNewsUrl, usersNewsUrl, isPosted, isDeleted]);

  if (!news || !userNews) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Wrapper>
        <PostNews isPosted={isPosted} setIsPosted={setIsPosted} />
        {news.map((article) => {
          const key = `news-${i}`;
          i++;

          return (
            <NewsFeed
              key={article._id || key}
              id={article._id || key}
              picture="/assets/img/images.jpg"
              givenName={article.author || "Anonymous"}
              familyName={article.author || "Anonymous"}
              username={article.author || "Anonymous"}
              title={article.title}
              description={article.description}
              likes={article.likes || []}
              isRemovable={article.author ? false : true}
              isShort={true}
              isDeleted={isDeleted}
              setIsDeleted={setIsDeleted}
            />
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid #f1f1f1;
  margin-left: 300px;
  position: absolute;
  top: 0;
  font-family: sans-serif;
`;

export default Home;
