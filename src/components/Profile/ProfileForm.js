import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authctx = useContext(AuthContext);
  const history = useHistory();
  const submitHandle = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBHst_wR17Lv4CFnTne-xR_uI7b8x9SsyI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authctx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/');
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandle}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
