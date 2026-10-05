import Dice from './components/games/dice.jsx';
import Landing from './components/landing.jsx';
import Home from './components/home.jsx';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Mines from './components/games/mines.jsx';
import Loadtop from './custhook/loadtop.jsx';
import Recentbt from './custhook/recentbt.jsx';
import Error from './components/error.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    loader: Loadtop,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path: "mines", element: <Mines /> },
      { path: "dice", element: <Dice /> },
    ],
    loader:Recentbt,
    errorElement:<Error />
  },
  {
    path: "/mines",
    element: <Mines />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
