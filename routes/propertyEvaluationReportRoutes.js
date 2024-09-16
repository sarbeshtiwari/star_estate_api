const express = require('express');
const router = express.Router();
const evaluationReportController = require('../controllers/propertyEvaluationReportController');

// Routes
router.post('/addEvaluationReport', evaluationReportController.createEvaluationReport);
router.get('/getEvaluationReport', evaluationReportController.getEvaluationReport);
router.delete('/deleteEvaluationReport/:id', evaluationReportController.deleteEvaluationReport);

module.exports = router;