const Patient = require('../models/patient_model');
const Report = require('../models/report_model');
const statusCodeList = ["Negative", "Travelled - Quarantine", "Symptoms - Quarantine", "Positive - Admit"];

//Register a new patient
//This is a protected route,i.e., only a logged in doctor can register a new patient

module.exports.register = async function (req, res) {

    try {

        //check if the patient already exists using the phone number
        //if the patient laready exists, return the data of the patient

        const patient = await Patient.findOne({ phone: req.body.phone });

        if (patient) {
            return res.status(200).json({
                status: 'Success',
                message: 'Patient exists',
                data: {
                    id: patient._id,
                    name: patient.name,
                    phone: patient.phone,
                    createdBy: req.user.name
                }
            })
        };

        //if the patient doesn't exist, register the patient
        const newPatient = await Patient.create({
            'phone': req.body.phone,
            'name': req.body.name,
            createdBy: req.user
        });

        return res.status(200).json({
            status: 'Success',
            message: 'Patient registered',
            data: {
                id: newPatient._id,
                name: newPatient.name,
                phone: newPatient.phone,
                createdBy: req.user.name
            }
        });

    } catch (err) {
        res.status(500).json({ 'message': 'Internal server error', err });
    }
}

//create a report for a patient
//This is a protected route,i.e., only a logged in doctor can perform this task

module.exports.createReport = async function (req, res) {

    try {

        //use patient's id to check if patient is registered
        //const patient = await Patient.findOne({ '_id': req.params.id });

        const patient = await Patient.findOne({ 'phone': req.params.id });

        if (!patient) {
            return res.status(400).json({
                'status': 'Failure',
                'message': 'Patient not registered'
            })
        };

        //if patient is registered, create a report
        const report = await Report.create({
            statusCode: req.body.status,
            status: statusCodeList[req.body.status],
            createdBy: req.user._id, //stores the Doctor object
            patient: patient._id    //stores the Patient object

        });

        //patient.reports.push(report);
        //patient.save();

        await Patient.updateOne({ 'phone': req.params.id }, {
            //Add the id of the report to the corresponding Patient document
            $push: {
                reports: report._id
            }
        });

        return res.status(201).json({
            'status': 'Success',
            'message': 'New report created'
        })

    } catch (err) {
        return res.status(500).json({ 'message': 'Internal server error', err });
    }


};

//get all the reports of a patient
//this route is unprotected, i.i, it can be accessed by anyone without authentication

module.exports.allReports = async function (req, res) {

    try {


        //use patient's id to check if patient is registered
        const patient = await Patient.findOne({ 'phone': req.params.id }, "name phone");

        console.log(patient);

        if (!patient) {
            return res.status(400).json({
                'status': 'Failure',
                'message': 'Patient not registered'
            })
        };

        let reports = await Report.find({'patient': patient._id}, "status createdAt createdBy -_id").sort('createdAt').populate('createdBy',"name -_id");

        
        console.log("REPORTS ",reports);

        return res.json(200, {
            message: "All Reports",
           // data: reports
            data: {
                patient: patient,
                reports: reports
            }
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'message': 'Internal server error', err });
    }


};