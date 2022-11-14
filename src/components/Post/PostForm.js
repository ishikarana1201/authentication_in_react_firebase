import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./PostForm.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostForm = () => {
  const history = useHistory();
  const [post, setPost] = useState({
    title: "",
    description: "",
    author: "",
    pic_url: "",
  });
  const { title, description, author, pic_url } = post;
  const onInputChange = (e) => {
    // console.log(e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://react-authentication-47a41-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      post
    );
    // await axios.post("http://localhost:3001/users", user);
    // history.replace("/");
    toast.success("You have successfully added your post");
    setPost({
      title: "",
      description: "",
      author: "",
      pic_url: "",
    })
  };

  return (
    <>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => onInputChange(e)}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="pic_url">Add Profile Url</label>
          <input
            type="text"
            id="pic_url"
            name="pic_url"
            value={pic_url}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className={classes.action}>
          <button>Add Post</button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default PostForm;
