
const router = require('express').Router();
const {getNewArrivals,searchByQueryType,services} = require('../controllers/filter');

router.get('/',getNewArrivals);
router.post('/search',searchByQueryType);
router.get('/services',services)
module.exports = router;