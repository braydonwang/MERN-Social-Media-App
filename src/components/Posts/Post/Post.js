import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost, likePost } from "../../../features/posts/postSlice";

export default function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };

  const handleLikePost = () => {
    dispatch(likePost(post._id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(post?.creator === user?.result?.googleId ||
          post?.creator === user?.result?._id) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.caption}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.button}
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikePost}
        >
          <Likes />
        </Button>
        {(post?.creator === user?.result?.googleId ||
          post?.creator === user?.result?._id) && (
          <Button
            className={classes.button}
            size="small"
            color="primary"
            onClick={handleDeletePost}
          >
            <DeleteIcon fontSize="small" />
            &thinsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
