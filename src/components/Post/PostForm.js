import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./PostForm.module.css";
import axios from "axios";

const PostForm = () => {
  
  const history = useHistory();
  const [post, setPost] = useState({
    title: "",
    description: "",
    author: "",
    pic: "",
  });
  const { title, description, author, pic } = post;
  const onInputChange = (e) => {
    // console.log(e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const onInputFileChange = (e) => {
    console.log(e.target.files[0] );
    setPost({ ...post, pic: e.target.files[0] });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://react-authentication-47a41-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      post
    );
    // await axios.post("http://localhost:3001/users", user);
    history.replace("/");
  };

  return (
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
        <label htmlFor="pic">Add Picture</label>
        <input
          type="file"
          id="pic"
          name="pic"
          value={pic}

          onChange={(e) => onInputFileChange(e)}
        />
      </div>
      <div className={classes.action}>
        <button>Add Post</button>
      </div>
    </form>
  );
};

export default PostForm;
