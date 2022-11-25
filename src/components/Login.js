import React from 'react';
import { useNavigate } from 'react-router';


function Login() {
    const navigate = useNavigate();
    //states
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null)

    //notification error
    const errorDiv = error
        ? <div className="error">
            <br />
            <i>{error}</i>
        </div>
        : '';

    async function handleErrors(response) {
        if (!response.ok) {
            setError(await response.text());
            throw Error(response.statusText);
        }
        return response;
    }

    const submitInfo = async (event) => {
        try {
            event.preventDefault();
            setError(null);
            //send data to backend
            const toSubmit = JSON.stringify({
                username,
                password,
            });
            const url = `${process.env.REACT_APP_API_URI}/api/user/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: toSubmit
            });
            //notify and/or navigate
            await handleErrors(response);
            navigate("/");
            window.location.reload();
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
                    {errorDiv}
                </form>
            </main>
        </div>
    );
}

export default Login;