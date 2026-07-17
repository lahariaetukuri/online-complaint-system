const Complaint = require("../models/Complaint");


// Create Complaint
exports.createComplaint = async (req, res) => {

    try {

        const { title, description, category } = req.body;


        const complaint = new Complaint({

            title,
            description,
            category,
            user: req.user.id

        });


        await complaint.save();


        res.status(201).json({

            message: "Complaint registered successfully",
            complaint

        });


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// Get User Complaints
exports.getComplaints = async (req, res) => {

    try {


        const complaints = await Complaint.find({

            user: req.user.id

        });


        res.json(complaints);



    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};





// Update Complaint Status (Admin)
exports.updateComplaintStatus = async (req,res)=>{

    try{


        const {status}=req.body;


        const complaint = await Complaint.findByIdAndUpdate(

            req.params.id,

            {
                status
            },

            {
                new:true
            }

        );


        res.json({

            message:"Complaint status updated",

            complaint

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};