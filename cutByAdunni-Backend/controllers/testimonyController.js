const Testimony = require("../models/Testimony");


// create testimony
exports.createTestimony = async (req, res) => {
        try {
            const { name, testimony } = req.body;
    
            const newTestimony = await Testimony.create({
                name,
                testimony,
                user: req.userId, 
                date: new Date(),

            });
    
            res.status(201).json({ message: "Testimony created", data: newTestimony });
        } catch (error) {
            console.error("Error creating testimony:", error);
            res.status(500).json({ message: error.message });
        }
    };


    // delete testimony (admin only)

    exports.deleteTestimony = async (req, res) => {
        try {
            const testimonyId = req.params.id;
    
            const deletedTestimony = await Testimony.findByIdAndDelete(testimonyId);
    
            if (!deletedTestimony) {
                return res.status(404).json({ message: "Testimony not found" });
            }
    
            res.status(200).json({ message: "Testimony deleted", data: deletedTestimony });
        } catch (error) {
            console.error("Error deleting testimony:", error);
            res.status(500).json({ message: error.message });
        }
    };
    


    // get all testimonies(admin only)
    exports.getAllTestimonies = async (req, res) => {
        try {
            const testimonies = await Testimony.find();
    
            res.status(200).json(testimonies);
        } catch (error) {
            console.error("Error fetching testimonies:", error);
            res.status(500).json({ message: error.message });
        }
    };

    // get specific user testimony(admin only)
    exports.getUserTestimonies = async (req, res) => {
        try {
            const testimonies = await Testimony.find({ user: req.userId });
    
            res.status(200).json(testimonies);
        } catch (error) {
            console.error("Error fetching testimonies:", error);
            res.status(500).json({ message: error.message });
        }
    };


  