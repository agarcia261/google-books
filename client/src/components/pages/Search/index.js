import React, { Component } from "react";
import API from "../../../utils/API";
import Cards from "../../../components/Cards";


import "./style.css";


class Search extends Component {
  state = {
    searchValue:"",
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.searchValue) {
      API.getBooks({
        search: this.state.searchValue,
      })
      .then(res => {
        if (res.data ==="OK"){
          return API.findAll();
        }
      })
      .then (res => this.setState({books: res.data})) 
      .catch(err => console.log(err));
    }
  };
  handleSearchChange = event => {
    this.setState({searchValue:event.target.value})
  }
  saveBook = id =>{
    API.saveBook(id)
  }

  render(){
  return (
    <div className="container">
      <div className="row search-form">
          <form className="col s12" onSubmit={this.handleFormSubmit}>
              <div className="row">
                  <div className="input-field col s12">
                      <input placeholder="Book Name" id="search-book" type="text" className="validate" value={this.state.searchValue} onChange={this.handleSearchChange}  />
                      <label htmlFor="first_name">Search</label>
                  </div>
                  <button className="btn waves-effect waves-light #0091ea light-blue accent-4 right" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>
              </div>
          </form>
      </div>
            {this.state.books.length ? (
              <Cards 
              books = {this.state.books}
              saveBook = {this.saveBook}
              />
            ) : (
              <h3>No Results to Display</h3>
            )}
    </div>
  );
  }

}

export default Search;