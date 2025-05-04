const Product = require("../models/Product");
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
const getProductById = async (req, res) =>{
    try{
        const { productId } = req.params;
        const Product = await Product.findById(productId);

        if (!Product ) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        res.status(200).json({
            message: "Product fetched",
        });
    }catch (error) {
        res.status(500).json({
            message:error.message || "Internal Server Error",
        });
    }  
};
const createProduct = async (req, res) => {
    try{
        const productData = req.body;
        const newProduct = await Product.create(productData);

        res.status(201).json({
            message:"product created",
            product: newProduct,
        });
    }catch (error) {
        res.status(500).json({
            message:error.message || "Internal Server Error",
        });
    }  
};
const updateProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const productData =req.body; 
        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
        }
        const updateProduct = await Product.findByIdAndUpdate(
            productId,
            productData,
            {
                new:true,
            }
        );

        res.status(200).json({
            message:"Product updated",
            product:updateProduct,
        });
    }catch (error) {
        res.status(500).json({
            message:error.message || "Internal Server Error",
        });
    } 
};

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({message:"Product not found"})
        }
        await Product.findByIdAndDelete(productId);
        res.status(204).json({
            message:"Product deleted",
        });
    }catch (error) {
        res.status(500).json({
            message:error.message || "Internal Server Error",
        });
    } 
};
module.exports = { 
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,

};
