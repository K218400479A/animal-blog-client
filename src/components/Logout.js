import { useNavigate } from 'react-router';
import { fetchHandler, getUser } from '../utils';

function Logout(props) {
    const navigate = useNavigate();
    (async function logout() {
        try {
            //send request to backend
            await fetchHandler("user/logout", "POST",);
            props.setLoggedInUser(await getUser());
            navigate("/");
        } catch (err) { console.error(err) }
    })();

    return (
        <div></div>
    )
}

export default Logout;