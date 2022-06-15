import axios from "axios";

const API_URL = "/api/posts/";

const getPosts = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};

const createPost = async (postData) => {
  /*const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };*/

  const res = await axios.post(API_URL, postData);

  return res.data;
};

const updatePost = async (postData) => {
  /*const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };*/

  const res = await axios.put(API_URL + postData.currentId, postData.postData);

  return res.data;
};

const deletePost = async (postData) => {
  /*const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };*/

  const res = await axios.delete(API_URL + postData);

  return res.data;
};

const likePost = async (postData) => {
  /*const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };*/

  const res = await axios.put(API_URL + postData + "/likePost");

  return res.data;
};

const postService = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};

export default postService;
