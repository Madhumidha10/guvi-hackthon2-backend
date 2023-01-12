const Category=require('../models/Category')

exports.create=async(req,res)=>{
    // console.log(req.user)
    const {category}=req.body;
    try {
        const exists=await Category.findOne({category:category})
        if(exists)
        {
            res.status(400).json({errorMessage:"Category already exists"})
        }
        else
        {
            await Category.create({category:category})
            res.status(200).json({successMessage:`${category} was created!`})
        }
    } catch (error) {
        res.status(500).json({errorMessage:"Please try again later"})
    }

}


exports.readAll=async(req,res)=>{

    try {
        const categories = await Category.find({});

		res.status(200).json({
			categories,
		});
    } catch (error) {
        res.status(500).json({errorMessage:"Please try again later"})
    }

}

exports.read=async(req,res)=>{
   console.log(req.params.id)
    try {
        const category = await Category.findOne({_id:req.params.id});
        
		res.status(200).json({
			category,
		});
    } catch (error) {
        res.status(500).json({errorMessage:"Please try again later"})
    }

}