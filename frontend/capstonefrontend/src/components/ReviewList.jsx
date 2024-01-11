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

export default function ReviewList() {
  const [searchParams, setSearchParams] = useSearchParams(); // import this hook
  const { query } = useContext(SearchContext);
  const { users, handleUpdateUsers } = useUserContext();
  const { currentSkills, handleUpdateSkills } = useSkillContext();
  const { currentPosts } = usePostsContext();

  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;
  const postsData =
    query === ""
      ? useData("http://localhost:8080/api/reviews/", [])
      : useData(`http://localhost:8080/api/reviews/`, []);
  const skillData = useData("http://localhost:8080/api/skills/", []);
  const userData = useData("http://localhost:8080/api/users/", []);
  handleUpdateUsers(userData);
  handleUpdateSkills(skillData);
  // the ? means only call map if postsData is not null
  console.log(currentSkills);
  console.log(postsData);

  const getSkillId =
    currentSkills.length !== 0 && Array.isArray(currentSkills) && query !== ""
      ? currentSkills.filter((skill) => skill.skillName === query)
      : null;
  // const forSkill= for(const )
  console.log(getSkillId);
  const filterUsers =
    users.length !== 0 && Array.isArray(users) && query !== ""
      ? users.filter((user) => user.skillId === getSkillId[0].id)
      : [];
  console.log(filterUsers);
  const filterPosts =
    filterUsers.length !== 0 && Array.isArray(postsData) && query !== ""
      ? postsData?.filter((post) => post.receiverId === filterUsers[0].id)
      : null;

  const postList =
    query === "" || filterPosts === null
      ? postsData?.map((review, index) =>
          // <>
          Array.isArray(users) && postsData.length !== 0 ? (
            <>
              <Grid item key={review.id} xs={6} md={4} lg={3}>
                <CustomCard
                  key={review.id}
                  rating={review.rating}
                  comment={review.comment}
                  userId={review.initiatorId}
                  receiverId={review.receiverId}
                  userArray={users}
                  skillArray={currentSkills}
                />
                <Link
                  to={"/review/" + review.id + review.rating + review.comment}
                >
                  review: {review.title}
                </Link>
              </Grid>
            </>
          ) : null
        )
      : filterPosts.map((review, index) =>
          // <>
          Array.isArray(users) &&
          users.length !== 0 &&
          currentSkills.length !== 0 ? (
            <>
              <Grid item key={review.id} xs={6} md={4} lg={3}>
                <CustomCard
                  key={review.id}
                  rating={review.rating}
                  comment={review.comment}
                  userId={review.initiatorId}
                  receiverId={review.receiverId}
                  userArray={users}
                  skillArray={currentSkills}
                  //   skillId={review.skillId}
                />
                <Link
                  to={"/review/" + review.id + review.rating + review.comment}
                >
                  review: {review.title}
                </Link>
              </Grid>
            </>
          ) : null
        );
  console.log(postsData);
  return (
    <>
      {Array.isArray(skillData) ? <FindSkill skills={skillData} /> : null}
      {/* <Grid container spacing={2} my={2}> */}{" "}
      {Array.isArray(postList) ? postList : null} {/* </Grid> */}
    </>
  );
}
