const db = require("../models");
const Product = db.product;
const Op = db.Op;
const fs = require("fs");
const image = db.images;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.code || !req.body.category ||  !req.body.image) {
      res.status(400).send({
        message: "All field is required!"
      });
      return;
    }
  
    // Create a product
    const product = {
      name: req.body.name,
      code: req.body.code,
      category: req.body.category,
    //   image : req.body.image,
      image: fs.readFileSync(
        __basedir + "/assets/uploads/" + req.body.image
      ),
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
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Product.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(500).send({
          message: err.message || "Some error accurred while retrieving books."
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