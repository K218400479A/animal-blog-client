import React from 'react';
import { useNavigate } from 'react-router';
import { errorDiv, fetchHandler, getUser, handleErrors } from '../utils';


function Login(props) {
    const navigate = useNavigate();
    //states
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null)

    const submitInfo = async (event) => {
        try {
            event.preventDefault();
            setError(null);
            //send data to backend
            const toSubmit = JSON.stringify({
                username,
                password,
            });

            //send request to backend
            const response = await fetchHandler("user/login", "POST", toSubmit,);

            //notify and/or navigate
            await handleErrors(response, setError);
            props.setLoggedInUser(await getUser());
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card">
            <main className="Login">
                <h1>Login</h1>
                <form onSubmit={submitInfo}>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <button type="submit">Login</button>
                    </div>
                    {errorDiv(error)}
                </form>
            </main>
        </div>
    );
}

export default Login;