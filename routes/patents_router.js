const router = require('express').Router();

const {
    getAllPatents,
    getPatentById,
    createPatent,
    updatePatent,
    deletePatent
} = require('../controllers/patents_controller.js');


router.get('/all', getAllPatents);
router.get('/get_by_id/:patent_id', getPatentById);

router.post('/create', createPatent);
router.put('/update/:patent_id', updatePatent);
router.delete('/delete/:patent_id', deletePatent);


module.exports = router;