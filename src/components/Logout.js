import { useNavigate } from 'react-router';

function Logout() {
    const navigate = useNavigate();
    (async function logout() {
        try {
            const url = `${process.env.REACT_APP_API_URI}/api/user/logout`;
            await fetch(url, {
                method: "POST",
                'credentials': 'include',
            });
            navigate("/");
            window.location.reload();
        } catch (err) { console.error(err) }
    })();

    return (
        <div></div>
    )
}

export default Logout;