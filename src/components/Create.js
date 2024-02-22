import React from 'react';
import { useNavigate } from 'react-router';
import { errorDiv, fetchHandler, getItems, handleErrors, successDiv } from '../utils';

function Create(props) {
    const navigate = useNavigate();

    //states
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imgURL, setImgURL] = React.useState("");
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)

    const createItem = async (event) => {
        try {
            event.preventDefault();

            //prepare data
            const toSubmit = JSON.stringify({
                title,
                description,
                imgURL,
            });

            //send request to backend
            const response = await fetchHandler("item/create", "POST", toSubmit)

            //notify and/or navigate
            await handleErrors(response, setError);
            setError(null);
            setSuccess("Creation Successful!");
            props.setItemsArray(await getItems());
            setTimeout(function () {
                navigate("/");
            }, 1500);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card">
            <main className="Create">
                <h1>Create</h1>
                <form onSubmit={createItem}>
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
                        <button type="submit">Create</button>
                    </div>
                    {errorDiv(error)}
                    {successDiv(success)}
                </form>
            </main>
        </div>
    );
}

export default Create;