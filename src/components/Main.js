import React from "react";
import Item from "./Item";

function Main(props) {

    return (
        <div className="row">
            <h1>Animal Blog</h1>
            <h2>Latest Animals</h2>
            {props.itemsArray
            .slice(0,3)
            .map((item, index) => {
                return (
                    <div className="column" key={index}>
                        <div className="card">
                            <Item title={item.title} description={item.description} imgURL={item.imgURL} />
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default Main;