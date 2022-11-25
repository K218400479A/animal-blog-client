import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

function Edit(props) {
    const navigate = useNavigate();
    const params = useParams();

    //states
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imgURL, setImgURL] = React.useState("");
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
            //send data to backend
            const toSubmit = JSON.stringify({
                title,
                description,
                imgURL,
            });
            const url = `${process.env.REACT_APP_API_URI}/api/item/edit/${params.id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: toSubmit
            });
            //notify and/or navigate
            await handleErrors(response);
            setError(null);
            setSuccess("Edit Successful!");
            setTimeout(function () {
                navigate("/profile");
                window.location.reload();
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
                    {errorDiv}
                    {successDiv}
                </form>
            </main>
        </div>
    );
}

export default Edit;