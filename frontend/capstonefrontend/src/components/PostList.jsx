import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import CustomCard from "../components/CustomCard";
import { Grid } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { useUserContext } from "../context/UserContext";
import { usePostsContext } from "../context/PostsContext";
import FindSkill from "./FindSkill";
import { useSkillContext } from "../context/SkillContext";

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams(); // import this hook
  const { query } = useContext(SearchContext);
  const { users } = useUserContext();
  const { currentSkills } = useSkillContext();
  const { currentPosts } = usePostsContext();

  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;
  const postsData =
    query === ""
      ? useData("http://localhost:8080/api/posts/", [])
      : useData(`http://localhost:8080/api/posts/`, []);

  const getSkillId =
    currentSkills.length !== 0 && Array.isArray(currentSkills) && query !== ""
      ? currentSkills.filter((skill) => skill.skillName === query)
      : null;
  // const forSkill= for(const )

  const filterUsers =
    users.length !== 0 && Array.isArray(users) && query !== ""
      ? users.filter((user) => user.skillId === getSkillId[0].id)
      : [];

  const filterPosts =
    filterUsers.length !== 0 && Array.isArray(postsData) && query !== ""
      ? postsData?.filter((post) => post.userId === filterUsers[0].id)
      : null;

  const postList =
    query === "" || filterPosts === null
      ? postsData?.map((post, index) =>
          // <>
          Array.isArray(users) &&
          users.length !== 0 &&
          currentSkills.length !== 0 ? (
            <>
              <Grid item key={post.id} xs={6} md={4} lg={3}>
                <CustomCard
                  key={post.id}
                  postId={post.id}
                  title={post.title}
                  body={post.body}
                  userId={post.userId}
                  userArray={users}
                  skillArray={currentSkills}
                  skillId={post.skillId}
                />
                <Link to={"/post/" + post.id + post.body}>
                  Post: {post.title}
                </Link>
              </Grid>
            </>
          ) : null
        )
      : filterPosts.map((post, index) =>
          // <>
          Array.isArray(users) &&
          users.length !== 0 &&
          currentSkills.length !== 0 ? (
            <>
              <Grid item key={post.id} xs={6} md={4} lg={3}>
                <CustomCard
                  key={post.id}
                  postId={post.id}
                  title={post.title}
                  body={post.body}
                  userId={post.userId}
                  userArray={users}
                  skillArray={currentSkills}
                  skillId={post.skillId}
                />
                <Link to={"/post/" + post.id + post.body}>
                  Post: {post.title}
                </Link>
              </Grid>
            </>
          ) : null
        );

  return (
    <>
      {Array.isArray(currentSkills) ? (
        <FindSkill skills={currentSkills} />
      ) : null}
      {/* <Grid container spacing={2} my={2}> */}{" "}
      {Array.isArray(postList) ? postList : null} {/* </Grid> */}
    </>
  );
}
