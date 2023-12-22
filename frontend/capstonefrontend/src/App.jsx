import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";

function App() {
  const [count, setCount] = useState(0);
  //https://media3.giphy.com/media/9WfkIiuzx3dWcTVfRy/giphy.gif
  return (
    <>
      <img
        src="https://assets-global.website-files.com/5ef420e5c4fe88900aa02371/63338a0a3b33920030fbc5db_HeartWeek_Man_01.svg"
        width="400px"
      />
      <br />
      <img
        src="https://see.fontimg.com/api/renderfont4/gx9W1/eyJyIjoiZnMiLCJoIjoxNjIsInciOjIwMDAsImZzIjo4MSwiZmdjIjoiI0MxM0EzQSIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/U0tJTExZIEJJTExZ/ultramarathondemo.png"
        width="500px"
      />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;
