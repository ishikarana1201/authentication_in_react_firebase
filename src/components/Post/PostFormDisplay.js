
import PostForm from './PostForm';
import classes from './PostFormDisplay.module.css';

const PostFormDisplay = () => {
  return (
    <section className={classes.profile}>
      <h1>Add Post</h1>
      <PostForm />
    </section>
  );
};

export default PostFormDisplay;
