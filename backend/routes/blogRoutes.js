const {Router} = require('express');
const {createNew, Blogs} = require('../controllers/blogControllers')

const router = Router();

router.post('/', createNew);
router.get('/', Blogs);



module.exports = router;
