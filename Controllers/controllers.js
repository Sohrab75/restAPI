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
     let limit =Number(req.query.limit) || 10;

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

const getAllOrders = async (req, res)=>{
    const orders =await Order.find({})
    console.log(orders)
    res.status(200).json({orders});
}

module.exports = {
    getAllProducts,
    getAllProductsTesting,
    getAllFeatureData,
    getAllReviewData,
    getAllCategoryData,
    getAllOrders
};