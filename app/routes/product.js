const multer = require('multer');

// Set up storage for uploaded images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = app => {
    const productController = require("../controllers/product.js");
  
    const router = require("express").Router();
  
    router.post("/add", upload.single('image'), productController.create);
  
    router.get("/", productController.findAll);
  
    router.get("/edit", productController.findOne);
  
    router.put("/edit:id", productController.update);
    
    app.use("/api/product", router);
  };