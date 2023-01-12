const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const EquipmentSchema = new mongoose.Schema(
	{
		fileName: {
			type: 'String',
			required: true,
		},
		equipmentName: {
			type: 'String',
			required: true,
			trim: true,
			maxlength: 60,
		},
		equipmentDesc: {
			type: 'String',
			trim: true,
		},
		equipmentPrice: {
			type: Number,
			required: true,
		},
		equipmentCategory: {
			type: ObjectId,
			ref: 'categories',
			required: true,
		},
		equipmentQty: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);
EquipmentSchema.index({equipmentName: 'text'});
const Equipment = mongoose.model('Equipments', EquipmentSchema);

module.exports = Equipment;