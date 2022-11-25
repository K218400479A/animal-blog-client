import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <nav className="topnav" >
            <span><Link to="/">Home</Link></span>
            <NavOptions loggedInUser={props.loggedInUser} />
        </nav>
    );

    // Specific components based on login status
    function NavOptions(props) {
        if (props.loggedInUser) {
            return <UserNav />;
        }
        return <GuestNav />;
    }
    function UserNav(props) {
        return (
            <div>
                <span><Link to="/profile">Profile</Link></span>
                <span><Link to="/create">Create</Link></span>
                <span style={{ float: "right" }}><Link to="/logout">Logout</Link></span>
            </div>
        );
    }
    function GuestNav(props) {
        return (
            <div>
                <span style={{ float: "right" }}><Link to="/login">Login</Link></span>
                <span style={{ float: "right" }}><Link to="/register">Register</Link></span>
            </div>
        );
    }


}


export default Nav;