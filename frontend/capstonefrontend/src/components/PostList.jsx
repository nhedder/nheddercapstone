import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import CustomCard from "../components/CustomCard";
import { Grid } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { useUserContext } from "../context/UserContext";
import { usePostsContext } from "../context/PostsContext";

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams(); // import this hook
  const { query } = useContext(SearchContext);
  const { users } = useUserContext();
  const { currentPosts } = usePostsContext();

  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;
  const postsData =
    query === ""
      ? useData("http://localhost:8080/api/posts/", [])
      : useData(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,
          []
        );

  // the ? means only call map if postsData is not null
  console.log(users);
  const postList = currentPosts?.map((post, index) =>
    // <>
    Array.isArray(users) && users.length !== 0 ? (
      <>
        <Grid item key={index} xs={6} md={4} lg={3}>
          <CustomCard
            title={post.title}
            body={post.body}
            userId={post.userId}
            userArray={users}
            //   skillId={post.skillId}
          />
          <Link to={"/post/" + post.id + post.body}>Post: {post.title}</Link>
        </Grid>
      </>
    ) : null
  );
  return (
    <>
      {/* <Grid container spacing={2} my={2}>
        {" "} */}
        {Array.isArray(postList) ? postList : null}{" "}
      {/* </Grid> */}
    </>
  );
}
