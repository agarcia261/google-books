import React from "react";
import "./style.css";

function Cards (props){
    return (
        <div className="row">
            <h1>Results:</h1>

        {props.books.map(books => {
            console.log(books)
          return (
            <div className="col s12 m12" key={books._id}>
                <h5 className="header">{books.title}</h5 >
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={books.image} alt = "" className="books-image"/> 
                    </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{books.description}</p>
                        <p>Author(s): {books.authors.join(", ")}</p>
                    </div>
                    <div className="card-action">
                        <a href={books.link} target="_blank" rel="noopener noreferrer">More Info</a>
                        <button className="btn waves-effect waves-light right red save-book" 
                            onClick={() => props.saveBook(books._id)} type="submit" name="action">Save
                            <i className="material-icons right">add_circle</i>
                        </button>
                    </div>
                </div>
                </div>
          </div>
           
          )
        })}
        </div>
    )}
export default Cards