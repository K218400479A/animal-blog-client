import React from "react";
import Item from "./Item";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { errorDiv, getItems, handleErrors, successDiv } from "../utils";

function Profile(props) {
    const navigate = useNavigate();

    //states
    const [itemsOwned, setItemsOwned] = React.useState([]);
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)

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
        await handleErrors(response, setError);
        window.scrollTo(0, 0);
        setError(null);
        setSuccess("Deletion Successful!");
        props.setItemsArray(await getItems());
        setTimeout(function () {
            navigate("/profile");
        }, 1500);
    }

    return (
        <div className="row">
            <h1>{props.loggedInUser.username}</h1>
            <h2>You have {itemsOwned.length} entries</h2>
            {errorDiv(error)}
            {successDiv(success)}
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