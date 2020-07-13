const Report = require('../models/report_model');
const statusCodeList = ["Negative", "Travelled - Quarantine", "Symptoms - Quarantine", "Positive - Admit"];

module.exports.reports = async function (req, res) {

    try {
        let report = await Report.find({ statusCode: req.params.status },"createdAt -_id").populate('createdBy',"name -_id").populate('patient',"name phone -_id");

        return res.status(200).json({
            'status': 'Success',
            'report_status': statusCodeList[req.params.status],
            'data': report
        })
    }
    catch (err) {
        res.status(500).json({ 'message': 'Internal server error', err });
    }
};