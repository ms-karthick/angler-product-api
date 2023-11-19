const { exit } = require("process");
const db = require("../models");
const Product = db.product;
const Op = db.Op;
const fs = require("fs");
const image = db.images;


exports.create =  (req, res) => {
// console.log(req)
    // Validate request
    if (!req.body.name || !req.body.code || !req.body.selectedCategories) {
      res.status(400).send({
        message: "All field is required!"
      });
      return;
    }

    // const nameExists =  Product.findOne({ name: req.body.name });
    // console.log(nameExists)
    // if (nameExists) {
    //   res.status(400).send({
    //     message: "Name must be unique!"
    //   });
    //   return;
    // }

    // const codeExists =  Product.findOne({ code: req.body.code });
    // if (codeExists) {
    //   res.status(400).send({
    //     message: "Code must be unique!"
    //   });
    //   return;
    // }
   
    // Create a product
    const product = {
      name: req.body.name,
      code: req.body.code,
      category: req.body.selectedCategories || [],
      // category: req.body.category,
      image : req.file ? req.file.buffer.toString('base64') : null,
      description: req.body.description,
    };

    // Save product in database
    Product.create(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Product."
        });
      });
  };
  

  exports.findOne = (req, res) => {

    // console.log(req);
    const id = req.params.id;
  
    Product.findByPk(id)
      .then(data => {
        // console.log(data.image)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: `Error retrieving Book with id = ${id}`
        });
      });
  };

  exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
      const page = parseInt(req.query.page) || 1;
      const pageSize = 8;
      const start = (page -1) * pageSize;
      // const end = start + pageSize;
     
      Product.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
      })
        .then(data => {
          // const totalPages = Math.ceil(data.count / pageSize);
    
          res.send(data.rows);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
          });
        });
  };



exports.update = (req, res) => {
  const id = req.params.id;
// console.log(id)

const products = {
  name: req.body.name,
  code: req.body.code,
  category: req.body.category,
  image : req.file ? req.file.buffer.toString('base64') : null,
  description: req.body.description,
};
// console.log('data ' +products)
  Product.update(products, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status:true,
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

