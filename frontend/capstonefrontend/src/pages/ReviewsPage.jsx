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
import { useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { useUserContext } from "../context/UserContext";
// save as pages/ReviewsPage.jsx

export default function ReviewsPage() {
  //   const [textField, setTextField] = useState("");
  //   const { setQuery } = useContext(SearchContext);
  const { users, handleUpdateUsers } = useUserContext();
  //    handleUpdateUsers();
  //   console.log(users);

  return (
    <div className="Reviews">
      <Outlet />
    </div>
  );
}

export function ReviewList(props) {
  const [searchParams, setSearchParams] = useSearchParams(); // import this hook
  const { query } = useContext(SearchContext);
  const { users, handleUpdateUsers } = useUserContext();
  const userArray = useData("http://localhost:8080/api/users/", []);
  handleUpdateUsers(userArray);
  //   console.log(users);
  const limit = searchParams.get("limit") ? searchParams.get("limit") : 5;
  const ReviewsData =
    query === ""
      ? useData("http://localhost:8080/api/reviews/", [])
      : useData(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,
          []
        );
  //   const users = useData("http://localhost:8080/api/users/", []);
  console.log(ReviewsData);
  // the ? means only call map if ReviewsData is not null

  const ReviewList = ReviewsData?.map((Review, index) => (
    <>
      {users.length != 0 ? (
        <Grid item key={index} xs={6} md={4} lg={3}>
          <CustomCard
            title={Review.comment}
            body={Review.rating}
            image={Review.image}
            userId={Review.initiatorId}
            receiverId={Review.receiverId}
            userArray={users}
            //   skillId={Review.skillId}
          />
          <Link to={"/Review/" + Review.id + Review.body}>
            Review: {Review.rating}
          </Link>
        </Grid>
      ) : null}
    </>
  ));

  return (
    <>
      <Grid container spacing={2} my={2}>
        {" "}
        {ReviewList}{" "}
      </Grid>
    </>
  );
}
// add to ReviewsPage.jsx

export function Review() {
  const navigate = useNavigate();
  const { id } = useParams(); // custom hook to access dynamic params
  const Review = useData("http://localhost:8080/Review/" + id, []);
  const handleNextReview = () => {
    navigate("/Reviews/" + (parseInt(id) + 1));
  };
  const handlePreviousReview = () => {
    navigate("/Reviews/" + (parseInt(id) - 1));
  };

  return (
    <div className="Review">
      {parseInt(id) > 1 && (
        <button onClick={handlePreviousReview}>Previous Review</button>
      )}

      <button onClick={handleNextReview}>Next Review</button>

      {Review.drinks ? (
        <>
          <h3>
            Review #{Review.drinks[0].idDrink}: {Review.drinks[0].strDrink}
          </h3>
          <p>{Review.body}</p>
        </>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}
// ++ Add a Next Review button to the Review component
