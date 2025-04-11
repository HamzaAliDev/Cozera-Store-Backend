const Product = require("../models/productModal");

// fetch products
const fetchProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the number of products to skip
        const skip = (page - 1) * limit;

        const filter = {};

        // Search by name (case-insensitive)
        if (req.query.search) {
            filter.name = { $regex: req.query.search, $options: 'i' };
        }

        // Filter by category
        if (req.query.category) {
            filter.category = req.query.category;
        }


        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }) // newest first
            .select("-description -variants -numReviews -sku")
            .lean()

        const total = await Product.countDocuments(filter);

        if (!products || products.length === 0) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'No products found'
            });
        }

        return res.status(200).json({
            data: products,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            error: false,
            message: 'Products fetched successfully'
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to fetch products"
        });
    }
}

// fetch product by id
const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                data: null,
                error: true,
                message: "Failed to fetch product"
            });
        }

        return res.status(200).json({
            data: product,
            error: false,
            message: 'Product fetched successfully'
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to fetch product"
        });
    }
}

// add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, variants, sku } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !images || !variants || !sku) {
            return res.status(400).json({
                data: null,
                error: true,
                message: "All fields are required"
            });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            images,
            variants,
            sku,
        });

        console.log("product", product);

        const newlyAddProduct = await product.save();

        return res.status(201).json({
            data: newlyAddProduct,
            error: false,
            message: 'Product added successfully'
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to add product"
        });
    }
}

// update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, images, variants, sku } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !images || !variants || !sku) {
            return res.status(400).json({
                data: null,
                error: true,
                message: "All fields are required"
            });
        }

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            images,
            variants,
            sku,
        }, { new: true });

        if (!product) {
            return res.status(404).json({
                data: null,
                error: true,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            data: product,
            error: false,
            message: 'Product updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to update product"
        });
    }
}

// delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                data: null,
                error: true,
                message: "Failed to delete product"
            });
        }

        return res.status(200).json({
            data: null,
            error: false,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to delete product"
        });
    }
}
module.exports = { fetchProducts, addProduct, fetchProductById, updateProduct, deleteProduct };