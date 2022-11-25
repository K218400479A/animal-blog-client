
function Item(props) {

    return (

        <div>
            <h2>{props.title}</h2>
            <img width="70%" src={props.imgURL} alt="item" />
            <p>{props.description}</p>
        </div>

    );

}

export default Item;