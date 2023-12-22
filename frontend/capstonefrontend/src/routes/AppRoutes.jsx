import { Routes, Route } from "react-router-dom";
// import DashboardPage, {
//   DashboardMessages,
//   DashboardTasks,
// } from "../pages/DashboardPage";
// import AboutPage from "../pages/AboutPage";
// import Homepage from "../pages/Homepage";
// import PageNotFound from "../pages/PageNotFound";

// import MUILoginForm from "../components/MUILogInForm";
// import PostsPage, { Post, PostList } from "../pages/PostsPage";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../pages/LoginPage";

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}

      {/* <Route index element={<Homepage {...props} />} /> */}
      {/* nested routes, matches on /dash/tasks etc */}

      {/* <Route path="dash" element={<ProtectedRoute><DashboardPage {...props} /></ProtectedRoute>}>
        <Route path="messages" element={<DashboardMessages />} />

        <Route path="tasks" element={<DashboardTasks />} />
      </Route>

      <Route path="/about" element={<AboutPage {...props} />} />

      <Route path="/posts" element={<PostsPage {...props} />}>
        <Route index element={<PostList />} />  */}
      {/* dynamic param taken from route, stored in variable called id */}

      {/* <Route path=":id" element={<Post />} /> 
      </Route> */}

      <Route path="/login" element={<LoginPage {...props} />} />
      {/* special route to handle if none of the above match */}

      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;
// Name this file AppRoutes.jsx and store in new folder 'routes'
