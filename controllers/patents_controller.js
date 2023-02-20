const Patent = require('../models/Patent');
const Last_ID = require('../models/id_count');
const _ = require('lodash');
//const patent_id = 0;
module.exports = {

    getAllPatents: async (req, res) => {
        try {
            const allPatents = await Patent.find();
            return res.status(200).json({
                success: true,
                message: "allPatents found",
                allPatents: allPatents
            })
        }
        catch (err) {
            return res.status(500).json({
                message: "Error in getting allPatents request",
                message: err.message
            })
        }
    },
    getPatentById: async (req, res) => {
        //return "getPatentById successfully"

        try {

            const patent_id = req.params.patent_id;

            const patent = await Patent.findById(patent_id);

            return res.status(200).json({
                success: true,
                message: "success to get patent by id",
                patent
            })

        } catch (error) {
            return res.status(500).json({
                message: "error in get patent by id request",
                error: error.message
            })
        }
    },
    createPatent: async (req, res) => {

        try {

            //creating unique patent_id
            const last_id_res = await Last_ID.find(null, { last_used: 1, _id: 0 });//ARRAY!!!

            const {
                patent_name,
                patent_creator,
                patent_description,
                patent_category,
                //patent_status
            } = req.body;

            if (!patent_name || !patent_creator || !patent_description) {
                throw new Error("mandatory fields are missings");
            }

            const patent_id = last_id_res[0].last_used + 1;


            //console.log(patent_id);

            const new_patent = new Patent({
                patent_id,
                patent_name,
                patent_creator,
                patent_description,
                patent_category: patent_category || "Other",

            });

            console.log(patent_id);

            await Last_ID.findOneAndUpdate({initial:
                "const"}, {last_used:  patent_id});
            await new_patent.save();

            return res.status(200).json({
                success: true,
                message: "success to create new patent"
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in create new patent request",
                error: error.message
            })
        }

    },
    updatePatent: async (req, res) => {
        try {
            const patent_id = req.params.patent_id;
            await Patent.findByIdAndUpdate(patent_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to update patent"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in update patent request",
                error: err.message
            })
        }
    },
    deletePatent: async (req, res) => {
        try {
            const patent_id = req.params.patent_id;
            await Patent.findByIdAndDelete(patent_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to delete patent"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in delete patent request",
                error: err.message
            })
        }
    }
}