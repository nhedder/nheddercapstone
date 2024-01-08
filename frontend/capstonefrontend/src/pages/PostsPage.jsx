import {
    Outlet,
    useParams,
    useSearchParams,
    Link,
    useNavigate,
  } from "react-router-dom";
  import { useData } from "../hooks/useData";
  import CustomCard from "../components/CustomCard";
  import BasicGrid from "../components/BasicGrid";
  import { TextField, Button, Grid } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import { useState, useContext, useEffect } from "react";
  import { SearchContext } from "../context/SearchContext";
  import { useUserContext } from "../context/UserContext";
  // save as pages/PostsPage.jsx
  export default function PostsPage() {
    //   const [textField, setTextField] = useState("");
    //   const { setQuery } = useContext(SearchContext);
    const { users, handleUpdateUsers } = useUserContext();
    const userArray = useData("http://localhost:8080/api/users/", []);
    Array.isArray(userArray) ? handleUpdateUsers(userArray) : null
    return (
      <div className="Posts">
        <Outlet />
      </div>
    );
  }
  export function PostList(props) {
    const [searchParams, setSearchParams] = useSearchParams(); // import this hook
    const { query } = useContext(SearchContext);
    const { users } = useUserContext();
    const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;
    const postsData =
      query === ""
        ? useData("http://localhost:8080/api/posts/", [])
        : useData(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,
          []
        );
    // the ? means only call map if postsData is not null
    console.log(users)
    const postList = postsData?.map((post, index) => (
      // <>
      Array.isArray(users) && users.length!==0 ? <>
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
        : null
    ));
    return (
      <>
        <Grid container spacing={2} my={2}>
          {" "}
          {Array.isArray(postList) ? postList : null}{" "}
        </Grid>
      </>
    );
  }
  // add to PostsPage.jsx
  export function Post() {
    const navigate = useNavigate();
    const { id } = useParams(); // custom hook to access dynamic params
    const post = useData("http://localhost:8080/post/" + id, []);
    const handleNextPost = () => {
      navigate("/posts/" + (parseInt(id) + 1));
    };
    const handlePreviousPost = () => {
      navigate("/posts/" + (parseInt(id) - 1));
    };
    return (
      <div className="Post">
        {parseInt(id) > 1 && (
          <button onClick={handlePreviousPost}>Previous Post</button>
        )}
        <button onClick={handleNextPost}>Next Post</button>
        {post.drinks ? (
          <>
            <h3>
              Post #{post.drinks[0].idDrink}: {post.drinks[0].strDrink}
            </h3>
            <p>{post.body}</p>
          </>
        ) : (
          "Loading ..."
        )}
      </div>
    );
  }
  // ++ Add a Next Post button to the Post component