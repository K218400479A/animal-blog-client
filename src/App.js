import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Error from './components/Error';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Main from './components/Main';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Create from './components/Create';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(false);
  const [itemsArray, setItemsArray ] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        // GET user data
        const user = await fetch(`${process.env.REACT_APP_API_URI}/api/user/`, {
          credentials: 'include',
        });
        const data = await user.json();
        setLoggedInUser(data);
        // GET item data
        const itemsURL =  `${process.env.REACT_APP_API_URI}/api/item`;
        const response = await fetch(itemsURL, {
          credentials: 'include',
        });
        const itemsArr = await response.json();
        setItemsArray(itemsArr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App Container">
      <Nav loggedInUser={loggedInUser} />

      <Routes>
        <Route path="/" exact element={<Main itemsArray={itemsArray} />} />
        <Route path="/profile" exact element={<Profile itemsArray={itemsArray} loggedInUser={loggedInUser} />} />
        <Route path="/edit/:id" exact element={<Edit itemsArray={itemsArray} loggedInUser={loggedInUser} />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
