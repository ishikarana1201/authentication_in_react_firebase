import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./DisplayPost.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const DisplayPost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    author: "",
    pic_url: "",
  });

  const { id } = useParams();

  const loadPost = async (e) => {
    const result = await axios.get(
      `https://react-authentication-47a41-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
    );
    setPost(result.data);
  };
  useEffect(() => {
    loadPost();
  }, []);
  console.log(post);
  toast.info("You have successfully added your details");
  return (
    <>
    <div className="polaroid">
      <img src={post.pic_url} alt={post.title} style={{width:'100%',height:'500px'}}/>
      <div className="container">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <h4>Author : {post.author}</h4>  
      </div>
    </div>
    <ToastContainer />
    </>
  );
};
export default DisplayPost;
