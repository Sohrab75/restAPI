const product = require('../Model/model')

const getAllProducts = async (req, res)=>{
    const {name, type, sort, select} = req.query;
    const queryObject ={};

    if(name){
        queryObject.name={$regex:name, $options:"i"};
        console.log(queryObject.name);
    }
    if(type){
        queryObject.type={$regex:type, $options:"i"};
        
    }
    let apiData= product.find(queryObject);
     if(sort){
        let sortFix = sort.replace(",").join(" ");
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

module.exports = {
    getAllProducts,
    getAllProductsTesting
};
