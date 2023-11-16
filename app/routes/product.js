module.exports = app => {
    const productController = require("../controllers/product.js");
  
    const router = require("express").Router();
  
    // router.post("/add", productController.create);
  
    router.get("/", productController.findAll);
  
    // router.get("/edit:id", productController.findOne);
  
    // router.put("/edit:id", productController.update);
    
    app.use("/api/product", router);
  };