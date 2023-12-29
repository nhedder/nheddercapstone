import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="PageNotFound">
      <h1>Page Not Found</h1>
      <img src="https://media3.giphy.com/media/pynZagVcYxVUk/giphy.gif" />
      <p>
        What were you looking for? Maybe going back <Link to="/">home </Link>
        will help you find it.
      </p>
    </div>
  );
}

export default PageNotFound;

// Save as PageNotFound.jsx in the 'pages' folder
// ++ Add a Back button to navigate one page back in the history
// ++ Add a standard <a href> link as well and observe the difference