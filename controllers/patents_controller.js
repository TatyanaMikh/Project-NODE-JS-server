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
            const last_id_res = await Last_ID.find(null, { last_used: 1, _id: 0 });//ARRAY!!!
            console.log(last_id_res[0].last_used);

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

            const last_id = last_id_res[0].last_used + 1;
            const _id = '63ebf5007b91d5fb5bd6aab0';
            console.log(_id);
            //console.log(last_id);
            let patent_id = last_id;
            //console.log(patent_id);

            const new_patent = new Patent({
                patent_id,
                patent_name,
                patent_creator,
                patent_description,
                patent_category: patent_category || "Other",

            });
            console.log(last_id);
            let last_used = last_id;
            console.log(last_used);
           /*  const count_schema = new Last_ID({
                last_used
            }); */
            await Last_ID.updateOne({_id:'63ebf5007b91d5fb5bd6aab0'}, {last_used: last_id});
            //await new_patent.save();

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