import React from 'react';
import { useNavigate } from 'react-router-dom';
import { errorDiv, fetchHandler, handleErrors, successDiv } from '../utils';

function Register() {
    const navigate = useNavigate();

    //states
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePass, setRePass] = React.useState('');
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)

    const submitInfo = async (event) => {
        try {
            event.preventDefault();
            //send data to backend
            const toSubmit = JSON.stringify({
                username,
                password,
                rePass
            });

            //send request to backend
            const response = await fetchHandler("user/register", "POST", toSubmit,);

            //notify and/or navigate
            await handleErrors(response, setError);
            setError(null);
            setSuccess("Registration Successful!");
            setTimeout(function () {
                navigate("/login");
            }, 1500);
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div className="card">
            <main className="Register">
                <h1>Register for a user account</h1>
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
                        <label htmlFor="rePass">Re-Password</label>
                        <input name="rePass" type="password" value={rePass} onChange={e => setRePass(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <button type="submit">Register</button>
                    </div>
                    {errorDiv(error)}
                    {successDiv(success)}
                </form>
            </main>
        </div>
    );
}

export default Register;