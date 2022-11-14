import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import axios from "axios";
import "./DisplaySinglePost.css";
import { useHistory } from 'react-router-dom';

function App() {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
  const loadPost = async () => {
    const result = await axios.get(
      "https://react-authentication-47a41-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
    );
    const data = result.data;
    const loadedPosts = [];
    for (const key in data) {
      loadedPosts.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        author: data[key].author,
        pic_url: data[key].pic_url,
      });
    }
    console.log(loadedPosts);
    setPosts(loadedPosts);
  };
  useEffect(() => {
    // console.log("test");
    loadPost();
  }, []);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = posts.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, posts]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  const handleSinglePost=(id)=>{
    // console.log(id);
    history.push(`/post/${id}`);
}
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Posts Slider
        </h2>
      </div>
      <div className="section-center">
        {posts.map((post, personIndex) => {
          const { id, pic_url, title, description, author } = post;

          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === post.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id} onClick={()=>{handleSinglePost(id)}}>
              <img src={pic_url} alt={title} className="person-img" />
              <h4>{title}</h4>
              <p className="text">{description}</p>
              <p className="title">{author}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
