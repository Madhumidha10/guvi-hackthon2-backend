const Equipment = require('../models/Equipment');
const fs = require('fs');

exports.create = async (req, res) => {
	const { filename } = req.file;
	const {
		equipmentName,
		equipmentDesc,
		equipmentPrice,
		equipmentCategory,
		equipmentQty,
	} = req.body;

	try {
		const newEquipment={fileName:filename,equipmentName:equipmentName,equipmentDesc:equipmentDesc,equipmentPrice:equipmentPrice,equipmentCategory:equipmentCategory,equipmentQty:equipmentQty}
		await Equipment.create(newEquipment)

		res.json({
			successMessage: `${equipmentName} was created`,
			newEquipment,
		});
	} catch (err) {
		console.log(err, 'Equipment create error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		const equipments = await Equipment.find({}).populate(
			'equipmentCategory',
			'category'
		).limit(6);

		res.json({ equipments });
	} catch (err) {
		console.log(err, 'equipmentController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readByCount = async (req, res) => {
	try {
		const equipments = await Equipment.find({})
			.populate('equipmentCategory', 'category')
			.limit(6);

		res.json({ equipments });
	} catch (err) {
		console.log(err, 'equipment readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.read = async (req, res) => {
	try {
		const equipmentId = req.params.equipmentId;
		const equipment = await Equipment.findById(equipmentId);
        console.log(equipment)
		res.json(equipment);
	} catch (err) {
		console.log(err, 'equipment read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.update = async (req, res) => {

	const equipmentId = req.params.equipmentId;
 
	if (req.file !== undefined) {
		req.body.fileName = req.file.filename;
	}

	const oldEquipment = await Equipment.findByIdAndUpdate(equipmentId, req.body);

	if (req.file !== undefined && req.file.filename !== oldEquipment.fileName) {
		fs.unlink(`uploads/${oldEquipment.fileName}`, err => {
			if (err) throw err;
			console.log('Image deleted from the filesystem');
		});
	}

	res.json({
		successMessage: 'equipment successfully updated',
	});
};

exports.deleteE = async (req, res) => {
	try {
		const equipmentId = req.params.equipmentId;
		const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);

		fs.unlink(`uploads/${deletedEquipment.fileName}`, err => {
			if (err) throw err;
			console.log(
				'Image successfully deleted from filesystem: ',
				deletedEquipment.fileName
			);
		});

		res.json(deletedEquipment);
	} catch (err) {
		console.log(err, 'equipmentController.delete error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

