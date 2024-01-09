import React, { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useData } from "../hooks/useData";
import { TextField, Button, Box, Grid } from "@mui/material";
import { SearchContext } from "../context/SearchContext";
import { useUserContext } from "../context/UserContext";
import { useCurrentUserContext } from "../context/CurrentUserContext";
import CustomCard from "../components/CustomCard";
import { usePostsContext } from "../context/PostsContext";

// Define UserContext
const UserContext = React.createContext();

export default function PostsPage() {
  const { currentPosts, setCurrentPosts } = usePostsContext();
  const { user: currentUser } = useCurrentUserContext();
  const { handleUpdateUsers } = useUserContext();
  const userArray = useData("http://localhost:8080/api/users/", []);
  const [newPostText, setNewPostText] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const postsData =
    // query === ""?
    useData("http://localhost:8080/api/posts/", []);
  //   : useData(
  //       `http://localhost:8080/api/posts/`,
  //       []
  // );
  // Update users context when userArray changes

  useEffect(() => {
    // let PostList= await postsData
    // setCurrentPosts(PostList)
    Array.isArray(userArray) && handleUpdateUsers(userArray);
  }, [userArray, handleUpdateUsers]);

  const handlePostSubmit = async (e) => {
    let PostList = await postsData;
    e.preventDefault();
    // const formElement= e.currentTarget
    // const data = new FormData(formElement);
    // logic to post the new text to the backend

    try {
      const response = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 2,
        }),
      });

      if (response.ok) {
      
        setCurrentPosts(PostList);
        window.location.reload();
        // Handle successful post creation, maybe update the posts list
        // You may fetch the updated posts and update the state here
      } else {
        // Handle error
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }

    // Clear the text box after posting
    setNewPostText("");
  };

  return (
    <div className="Posts">
      {/* New Post Form */}
      <Box component="form" onSubmit={handlePostSubmit}>
        <TextField
          id="new-post-text"
          label="Title"
          variant="outlined"
          fullWidth
          multiline
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="new-post-text"
          label="New Post"
          variant="outlined"
          fullWidth
          multiline
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Post
        </Button>
      </Box>

      <Outlet />
    </div>
  );
}
