//fetching
export const getUser = async () => {
    const url = `${process.env.REACT_APP_API_URI}/api/user/`;
    const user = await fetch(url, {
        credentials: 'include',
    });
    const data = await user.json();
    return data;
}

export const getItems = async () => {
    const url = `${process.env.REACT_APP_API_URI}/api/item`;
    const response = await fetch(url, {
        credentials: 'include',
    });
    const itemsArr = await response.json();
    return itemsArr;
}

export const fetchHandler = async (route, method, body, id,) => {
    const url = `${process.env.REACT_APP_API_URI}/api/${route}` + (id ? `/${id}` : '');
    return await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: body,
    });
}
//

//errors
export const handleErrors = async (response, setError) => {
    if (!response.ok) {
        setError(await response.text());
        throw Error(response.statusText);
    }
    return response;
}
//

//notifications
export const errorDiv = (error) => {
    return error
        ?
        <div className="error">
            <br />
            <i>{error}</i>
        </div>
        :
        '';
}
export const successDiv = (success) => {
    return success
        ?
        <div className="success">
            <br />
            <i>{success}</i>
        </div>
        :
        '';
}
//