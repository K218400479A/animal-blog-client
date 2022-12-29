import { useNavigate } from 'react-router';
import { getUser } from '../utils';

function Logout(props) {
    const navigate = useNavigate();
    (async function logout() {
        try {
            const url = `${process.env.REACT_APP_API_URI}/api/user/logout`;
            await fetch(url, {
                method: "POST",
                'credentials': 'include',
            });
            props.setLoggedInUser(await getUser());
            navigate("/");
        } catch (err) { console.error(err) }
    })();

    return (
        <div></div>
    )
}

export default Logout;