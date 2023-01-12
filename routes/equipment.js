
const {deleteE,create,readAll, read, update,services} = require('../controllers/equipment');
const { authenticateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');
const router=require('express').Router();
router.post('/',authenticateJWT,upload.single("equipmentImage"),create)
router.get('/',readAll)
router.get('/:equipmentId',read)
router.delete('/:equipmentId',authenticateJWT,deleteE)
router.put('/:equipmentId',authenticateJWT,upload.single('equipmentImage'),update)

module.exports=router