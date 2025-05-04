const Product = require("../models/Product");

const getProducts = async(req, res) =>{
    try{
        const products = await Product.find();

        res.status(200).json({
            message: "Product fetched",
            products:products,
        });
    }
    catch (error) {
        res.status(500).json({
            message:error.message || "Internal Server Error",
        });
    }  
};

module.exports = { getProducts};
