import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts, updatePost } from "../redux/posts/postsSlice";

import "./Posts.css";

const Posts = () => {
  const dispatch = useDispatch();

  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.postsR
  );
  console.log(posts);
  // Get posts starts here ---------------------------------
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  // Get posts finishes here ---------------------------------
  // Delete starts here ------------------
  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };
  // Delete finishes here ------------------
  // Update starts here ------------------
  const updateHandler = (id) => {
    let newPost = {
      title: "updated title",
      body: "updated body",
      userId: 1,
    };
    newPost = {
      ...newPost,
      id,
    };
    dispatch(updatePost({ newPost }));
  };
  // Update finishes here ------------------
  return (
    <div>
      <h1>Posts</h1>
      {isLoading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      {isError && (
        <div>
          <h1>Error...</h1>
        </div>
      )}
      <div>
        {posts?.length > 0 &&
          posts.map((post) => {
            return (
              <div key={post.id}>
                <p>{post.title}</p>
                <button onClick={() => deleteHandler(post.id)}>Delete</button>
                <button onClick={() => updateHandler(post.id)}>Edit</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
