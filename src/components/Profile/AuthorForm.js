import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const AuthorForm = () => {
  const history = useHistory();
  const [author, setAuthor] = useState({
    name: "",
    unique_name: "",
    city: "",
    profile: "",
  });
  const { name, unique_name, city, profile } = author;
  const onInputChange = (e) => {
    // console.log(e.target.value);
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://react-authentication-47a41-default-rtdb.europe-west1.firebasedatabase.app/authors.json",
      author
    );
    // await axios.post("http://localhost:3001/users", user);
    // history.replace("/");
    // console.log("Cxc");
    toast.success("You have successfully added your details");
    setAuthor({
      name: "",
      unique_name: "",
      city: "",
      profile: "",
    });

  };

  return (
    <>
    <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
      <h1>Your Details</h1>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="unique_name">User Name</label>
        <input
          type="text"
          id="unique_name"
          name="unique_name"
          value={unique_name}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <p className="text-red">* user name should be unique</p>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="profile">Add Profile Picture</label>
        <input
          type="text"
          id="profile"
          name="profile"
          value={profile}
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
theme="dark"/>
    </>
  );
};

export default AuthorForm;
