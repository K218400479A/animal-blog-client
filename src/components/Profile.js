import React from "react";
import Item from "./Item";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Profile(props) {
    const navigate = useNavigate();

    //states
    const [itemsOwned, setItemsOwned] = React.useState([]);
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)

    //notification elements
    const errorDiv = error
        ? <div className="error">
            <br />
            <i>{error}</i>
        </div>
        : '';
    const successDiv = success
        ? <div className="success">
            <br />
            <i>{success}</i>
        </div>
        : '';

    async function handleErrors(response) {
        if (!response.ok) {
            setError(await response.text());
            throw Error(response.statusText);
        }
        return response;
    }

    //filter animals that the user created
    React.useEffect(() => {
        const itemsOwned = props.itemsArray.filter(item => {
            return item.creatorID === props.loggedInUser.id;
        });
        setItemsOwned(itemsOwned);
    }, [props.itemsArray, props.loggedInUser.id]);

    async function deleteItem(id) {
        //send request to backend
        const deleteURL = `${process.env.REACT_APP_API_URI}/api/item/delete/${id}`;
        const response = await fetch(deleteURL, {
            method: "DELETE",
            credentials: 'include',
        });
        //notify and/or navigate
        await handleErrors(response);
        window.scrollTo(0, 0);
        setError(null);
        setSuccess("Deletion Successful!");
        setTimeout(function () {
            navigate("/profile");
            window.location.reload();
        }, 1500);
    }

    return (
        <div className="row">
            <h1>{props.loggedInUser.username}</h1>
            <h2>You have {itemsOwned.length} entries</h2>
            {errorDiv}
            {successDiv}
            {itemsOwned.map((item, index) => {
                return (
                    <div className="column" key={index}>
                        <div className="card">
                            <Item key={item._id} title={item.title} description={item.description} imgURL={item.imgURL} />
                            <button><Link className="class1" to={`/edit/${item._id}`}>Edit</Link></button>
                            <button onClick={() => deleteItem(item._id)}>Delete</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default Profile;