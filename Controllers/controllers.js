const product = require('../Model/model')
const review = require('../Model/model2')
const feature = require('../Model/model1')


const getAllProducts = async (req, res)=>{
    const {name, type, sort, select,feature,review} = req.query;
    const queryObject ={};

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
    let apiData= product.find(queryObject);
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



const getAllProductsTesting = async (req, res)=>{
    const products = await product.find(req.query).select("name cost");
    res.status(200).json({products});
    
};

const getAllFeatureData = async (req, res)=>{
    const features =await feature.find(req.query)
    res.status(200).json({features});

}

const getAllReviewData = async (req, res)=>{
    const reviews =await review.find(req.query)
    res.status(200).json({reviews});

}

module.exports = {
    getAllProducts,
    getAllProductsTesting,
    getAllFeatureData,
    getAllReviewData
};
