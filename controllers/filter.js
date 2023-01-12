const Equipment=require('../models/Equipment')
const Category=require('../models/Category')
exports.getNewArrivals = async (req, res) => {
	const sortBy = req.query.sortBy ? req.query.sortBy : -1;
	const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(3);

	try {
		const newArrivals = await Equipment.find({}).sort({createdAt: sortBy}).limit(limit);
        // console.log(newArrivals)
		res.json({newArrivals});
	} catch (err) {
		console.log(err, 'filter Controller.getNewArrivals error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.searchByQueryType = async (req, res) => {
	const { type, query } = req.body;
   
	try {
		let equipments;
            //  console.log(Equipment.find({ $text: { $search: query } }))
		switch (type) {
			case 'text':
				equipments = await Equipment.find({ $text: { $search: query }});
				break;
			case 'category':
				equipments = await Equipment.find({ equipmentCategory: query });
				break;
		}
        
		if (!equipments.length > 0) {
			equipments = await Equipment.find({});
		}

		res.json({ equipments });
	} catch (err) {
		console.log(err, 'filter Controller.searchByQueryType error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};
exports.services = async (req, res) => {
	
	try {
       let categories=await Category.find();
	   let categoriesIDs=categories.map(cat=>cat._id);
	   let services=[];
	   for(let i=0;i<categoriesIDs.length;i++){
		services.push(await Equipment.findOne({equipmentCategory: categoriesIDs[i]}))
	   }

	//    console.log(services)
	   res.json(services.filter(ser=>ser!=null))
	

	}catch (error) {
		   console.log(error, 'services error');
		   res.status(500).json({
			   errorMessage: 'Please try again later',
		   });
	   }
   }