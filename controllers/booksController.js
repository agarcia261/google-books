const db = require("../ Models");
const axios = require('axios')

// Defining methods for the booksController
module.exports = {
  search: function(req, res) {
    let query = req.body.search.split(" ").join("+")
    db.Book.deleteMany({ saved: false }, function (err) {
      if (err) {console.log(err)}
      // deleted at most one tank document
    });
    axios({
      method:'get',
      url:'https://www.googleapis.com/books/v1/volumes?q='+query+'&key='+process.env.GOOGLE_KEY
    })
    .then(resp => {
      // console.log(resp.data.items)
      resp.data.items.forEach(result =>{
        let imglink = ""
        let authors = "No Author Available."
        let description = "No description available."

        if (result.volumeInfo.imageLinks){
          imglink = result.volumeInfo.imageLinks.smallThumbnail
        }
        if (result.volumeInfo.authors){
          authors = result.volumeInfo.authors
        }
        if (result.volumeInfo.description){
          description = result.volumeInfo.description
        }
                
        let book = {
          title:result.volumeInfo.title,
          description: description,
          authors: authors,
          image:imglink,
          link:result.volumeInfo.infoLink,
        }
        db.Book.create(book)
        .catch(err => console.log(err))
      })
      res.status(200).send("OK");

    })
    .catch(err => console.log(err))
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    console.log("getting to find all")
    db.Book.find({saved:false})
    .then(results => res.json(results))
    .catch(err => console.log(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  saveBook: function (req, res){
    console.log(req.body.id)
    db.Book
    .update({ _id: req.body.id }, {$set: { saved: true }})
    .then(dbModel => {
      console.log(dbModel)
      res.json(dbModel)})
    .catch(err => res.status(422).json(err));
  }
};
