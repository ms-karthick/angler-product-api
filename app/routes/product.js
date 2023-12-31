const multer = require('multer');

// Set up storage for uploaded images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = app => {
    const productController = require("../controllers/product.js");
  
    const router = require("express").Router();
  
    router.post("/add", upload.single('image'), productController.create);
  
    router.get("/", productController.findAll);
  
    router.get("/edit/:id", productController.findOne);
  
    router.put("/update/:id", upload.single('image'), productController.update);
    
    app.use("/api/product", router);
  };