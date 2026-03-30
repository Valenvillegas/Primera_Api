import Product from "../models/product.model.js";

class ProductRepository {
    async create(
        fk_owner_id,
        {
            title,
            description,
            price,
            stock,
            created_at
        }
    ) {
        await Product.create({ fk_owner_id, title, description, price, stock, created_at })
    }
    async findById(id_product) {
        const product_found = await Product.findById(id_product)
    }
    async getAllbyUserId(owner_id) {
        const products_found = await Product.find({ fk_owner_id: owner_id })
    }
    async getAll() {
        const products = await Product.find()
    }
    async deleteById(product_id) {
        await Product.findByIdAndDelete(product_id)
    }
    async updateById(product_id, update_data) {
        const updated_product = await Product.findByIdAndUpdate(
            product_id,
            update_data,
            {
                returnDocument: "after",
            }
        )
        return updated_product
    }

}

const productRepository = new ProductRepository()
export default productRepository