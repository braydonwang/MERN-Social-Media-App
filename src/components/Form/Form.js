import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import {
  createPost,
  updatePost,
  getPosts,
} from "../../features/posts/postSlice";

import useStyles from "./styles";

export default function Form({ currentId, setCurrentId }) {
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    caption: "",
    tags: [],
    selectedFile: "",
  });
  const { currentPage } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postData.caption.length > 0) {
      if (currentId) {
        dispatch(
          updatePost({
            currentId,
            postData: { ...postData, name: user?.result?.name },
          })
        );
      } else {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
        dispatch(getPosts(currentPage));
      }
    }

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories.
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      caption: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Post
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="caption"
          variant="outlined"
          label="Caption"
          fullWidth
          value={postData.caption}
          onChange={(e) =>
            setPostData({ ...postData, caption: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            value={postData.selectedFile}
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
