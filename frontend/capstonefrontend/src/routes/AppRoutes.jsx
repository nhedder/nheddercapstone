import { Routes, Route } from "react-router-dom";
// import DashboardPage, {
//   DashboardMessages,
//   DashboardTasks,
// } from "../pages/DashboardPage";
//  import AboutPage from "../pages/AboutPage";
// import Homepage from "../pages/Homepage";
import PageNotFound from "../pages/PageNotFound";
import PostList from "../components/PostList";

// import MUILoginForm from "../components/MUILogInForm";
import PostsPage from "../pages/PostsPage";
import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../pages/LoginPage";
import ReviewsPage from "../pages/ReviewsPage";
import ChatApp from "../pages/Chat";
import SignUpPage from "../pages/SignUpPage";
import SkillsPage from "../pages/SkillsPage";
import ProfilePage from "../pages/ProfilePage";
import ReviewList from "../components/ReviewList";
import AboutPage from "../pages/AboutPage";

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}

      {/* nested routes, matches on /dash/tasks etc */}
      <Route path="/chat" element={<ChatApp {...props} />} />
      <Route path="/profile" element={<ProfilePage {...props} />} />
      <Route path="/" element={<PostsPage {...props} />}>
        <Route index element={<PostList />} />
        {/* dynamic param taken from route, stored in variable called id */}

        {/* <Route path=":id" element={<Post />} />*/}
      </Route>

      <Route path="/review" element={<ReviewsPage {...props} />}>
        <Route index element={<ReviewList />} />
        {/* dynamic param taken from route, stored in variable called id */}

        {/* <Route path=":id" element={<Review />} /> */}
      </Route>

      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/login" element={<LoginPage {...props} />} />
      {/* special route to handle if none of the above match */}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
