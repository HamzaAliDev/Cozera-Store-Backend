const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, enum: ["Clothing", "Shoes", "Accessories"] },
        images: [{ type: String, required: true, }],
        variants: [
            {
                color: { type: String, required: true }, // Color variant
                sizes: [
                    {
                        size: { type: String, enum: ["S", "M", "L", "XL"], required: true },
                        stock: { type: Number, required: true, min: 0 },
                    },
                ],
            },
        ],
        ratings: { type: Number, default: 0, min: 0, max: 5 },
        numReviews: { type: Number, default: 0 },
        isFeatured: { type: Boolean, default: false },
        sku: { type: String },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
