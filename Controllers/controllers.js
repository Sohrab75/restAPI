const Product = require('../Model/model')
const review = require('../Model/model2')
const feature = require('../Model/model1')
const category = require('../Model/model3')
const Order = require('../Model/modelOrder')


const getAllProducts = async (req, res)=>{
    const {name, type, sort, select,feature,review, categoryId,id, cost} = req.query;
    let queryObject ={};

    if (categoryId) {
        let catId = Number(req.query.categoryId);
        queryObject = {"category_id":catId};
    }
    if(id){
        let id = Number(req.query.id);
        queryObject = {"id":id};
    }
    if(review){
        queryObject.review={$regex:review, $options:"i"};
        console.log(queryObject.review);
    }
    if(feature){
        queryObject.feature={$regex:feature, $options:"i"};
        console.log(queryObject.feature);
    }
    if(name){
        queryObject.name={$regex:name, $options:"i"};
        console.log(queryObject.name);
    }
    if(type){
        queryObject.type={$regex:type, $options:"i"};
        
    }
    let apiData= Product.find(queryObject);
     if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData= apiData.sort(sortFix);
     }

     if(select){
        // let selectFix = select.replace(",", "");
        let selectFix = select.split(",").join(" ");

        apiData= apiData.select(selectFix);
     }

     let page =Number(req.query.page) || 1 ;
     let limit =Number(req.query.limit) || 0;

     let skip = (page-1)*limit;
     apiData = apiData.skip(skip).limit(limit);
     console.log(skip);

    console.log(queryObject);

    const products = await apiData;
    res.status(200).json({products, nbHits:products.length});
    
};

const getAllProductsTesting = async (rq, res)=>{
    const myData= await Product.find(req.query).select("name cost")
}


const getAllFeatureData = async (req, res)=>{
    const features =await feature.find(req.query)
    res.status(200).json({features});

}

const getAllReviewData = async (req, res)=>{
    const reviews =await review.find(req.query)
    res.status(200).json({reviews});

}

const getAllCategoryData = async (req, res)=>{
    const categories =await category.find(req.query)
    res.status(200).json({categories});
}

// Create a new category
const createCategory = async (req, res) => {
    try {
        const newCategory = await category.create(req.body);
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category' });
    }
};

// Update an existing category by ID
const updateCategory = async (req, res) => {
    const categoryId = req.params.category_id; // Get the category id from the URL
    const updatedCategoryData = req.body; // Updated category data

    try {
        const filter = {category_id: categoryId }; // Filter by '_id' field (assuming '_id' is the category's unique identifier)
        const updatedCategory = await category.findOneAndUpdate(filter, updatedCategoryData, {
            new: true, // Return the updated document
        });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating category' });
    }
};

// Delete an existing category by ID
const deleteCategory = async (req, res) => {
    const categoryId = req.params.category_id; // Get the category id from the URL
    try {
        const filter = {category_id: categoryId }; // Filter by '_id' field (assuming '_id' is the category's unique identifier)
        const deletedCategory = await category.findOneAndDelete(filter);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting category' });
    }
};



const getAllOrders = async (req, res)=>{
    const orders =await Order.find({})
    console.log(orders)
    res.status(200).json({orders});
}

const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' });
    }
};


const updateProduct = async (req, res) => {
    const productId = req.params.productId; // Get the product id from the URL
    const updatedProductData = req.body; // Updated product data

    try {
        const filter = { id: productId }; // Filter by 'id' field
        const updatedProduct = await Product.findOneAndUpdate(filter, updatedProductData, {
            new: true, // Return the updated document
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        // res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.productId; // Get the product id from the URL

    try {
        const filter = { id: productId }; // Filter by 'id' field
        const deletedProduct = await Product.findOneAndDelete(filter);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
};



module.exports = {
    getAllProducts,
    getAllProductsTesting,
    getAllFeatureData,
    getAllReviewData,
    getAllCategoryData,
    getAllOrders,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    updateCategory,
    deleteCategory,
};