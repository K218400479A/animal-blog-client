import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { errorDiv, fetchHandler, getItems, handleErrors, successDiv } from '../utils';

function Edit(props) {
    const navigate = useNavigate();
    const params = useParams();

    //states
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imgURL, setImgURL] = React.useState("");
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)

    //fill form with existing animal data
    React.useEffect(() => {
        const theItem = props.itemsArray.filter(item => {
            return item._id === params.id;
        })[0];
        if (theItem !== undefined) {
            setTitle(theItem.title);
            setDescription(theItem.description);
            setImgURL(theItem.imgURL);
        }
    }, [props.itemsArray, params.id]);

    const editItem = async (event) => {
        try {
            event.preventDefault();

            //prepare data
            const toSubmit = JSON.stringify({
                title,
                description,
                imgURL,
            });

            //send request to backend
            const response = await fetchHandler("item/edit", "PUT", toSubmit, params.id);

            //notify and/or navigate
            await handleErrors(response, setError);
            setError(null);
            setSuccess("Edit Successful!");
            props.setItemsArray(await getItems());
            setTimeout(function () {
                navigate("/profile");
            }, 1500);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card">
            <main className="Edit">
                <h1>Edit</h1>
                <form onSubmit={editItem}>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea cols="22" rows="7" name="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="imgURL">Image URL</label>
                        <input name="imgURL" type="text" value={imgURL} onChange={e => setImgURL(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <button type="submit">Edit</button>
                    </div>
                    {errorDiv(error)}
                    {successDiv(success)}
                </form>
            </main>
        </div>
    );
}

export default Edit;