import axios from "axios";

const API_URL = "/api/posts/";

const getPosts = async (page) => {
  const { data } = await axios.get(`/api/posts?page=${page}`);

  return data;
};

const getPost = async (id) => {
  const { data } = await axios.get(API_URL + id);

  return data;
};

const getPostsBySearch = async (searchQuery) => {
  const { data } = await axios.get(
    API_URL +
      `search?searchQuery=${searchQuery.search || "none"}&tags=${
        searchQuery.tags
      }`
  );

  return data.data;
};

const createPost = async (postData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
    },
  };

  const res = await axios.post(API_URL, postData, config);

  return res.data;
};

const updatePost = async (postData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
    },
  };

  const res = await axios.put(
    API_URL + postData.currentId,
    postData.postData,
    config
  );

  return res.data;
};

const deletePost = async (postData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
    },
  };

  const res = await axios.delete(API_URL + postData, config);

  return res.data;
};

const likePost = async (postData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
    },
  };

  const res = await axios.put(API_URL + postData + "/likePost", "", config);

  return res.data;
};

const postService = {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
};

export default postService;
