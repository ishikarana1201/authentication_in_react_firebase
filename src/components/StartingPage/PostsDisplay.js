import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./StartingPageContent.module.css";

const PostsDisplay = () => {
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
  // console.log(users)

const handleSinglePost=(id)=>{
    // console.log(id);
    history.push(`/post`);
}
  return (
    <section className="photos">
      <div
        className="photos-center"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "1px",
          padding: "10px",
        }}
      >
        {posts.map((post, index) => {
          return (
            <div className="photo" style={{ marginBottom: "-50px" }} onClick={()=>{handleSinglePost(post.id)}} key={post.id}>
              <img
                src={post.pic_url}
                alt={post.title}
                style={{
                  width: "90%",
                  height: "80%",
                  gridColumn: index < 2 ? "span 2" : "span 1",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              />
              <h3
                style={{
                  marginTop: "-80px",
                  color: "white",
                  marginLeft: "20px",
                  fontSize: "25px",
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  marginTop: "-18px",
                  color: "white",
                  marginLeft: "20px",
                }}
              >
                {post.author}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default PostsDisplay;
