const { exit } = require("process");
const db = require("../models");
const Product = db.product;
const Op = db.Op;
const fs = require("fs");
const image = db.images;


exports.create =  (req, res) => {
console.log(req)
    // Validate request
    if (!req.body.name || !req.body.code || !req.body.category) {
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
      category: req.body.category,
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
  


  exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    // Product.findAll({ where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.send(500).send({
    //       message: err.message || "Some error accurred while retrieving books."
    //     });
    //   });

    const name = req.query.title;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
    
      var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
      Product.findAndCountAll({
        where: condition,
        limit: limit,
        offset: (page - 1) * limit,
      })
        .then(data => {
          const totalPages = Math.ceil(data.count / limit);
    
          res.send({
            totalItems: data.count,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: limit,
            data: data.rows,
          });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
          });
        });
  };


// exports.findAllPagination = (req, res) => {
//   const name = req.query.title;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//   Product.findAndCountAll({
//     where: condition,
//     limit: limit,
//     offset: (page - 1) * limit,
//   })
//     .then(data => {
//       const totalPages = Math.ceil(data.count / limit);

//       res.send({
//         totalItems: data.count,
//         totalPages: totalPages,
//         currentPage: page,
//         itemsPerPage: limit,
//         data: data.rows,
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving products."
//       });
//     });
// };