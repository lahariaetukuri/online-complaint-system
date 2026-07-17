const express = require("express");
const router = express.Router();

const {
    createComplaint,
    getComplaints,
    updateComplaintStatus
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");


// Create complaint
router.post(
    "/",
    authMiddleware,
    createComplaint
);


// Get user's complaints
router.get(
    "/",
    authMiddleware,
    getComplaints
);


// Update complaint status (Admin)
router.put(
    "/:id",
    authMiddleware,
    updateComplaintStatus
);


module.exports = router;