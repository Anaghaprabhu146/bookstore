const applicationModel = require("../models/applicationModel");


exports.ApplyJob = async (req, res) => {
  try {
    let { fullName, email, phoneNumber, jobId, jobRole } = req.body;
    let resume = req.file.filename;

    let existingApplication = await applicationModel.findOne({ email, jobId });

    if (existingApplication) {
      res.status(409).json({ message: "already applided to this job role" });
    } else {
      // apply job
      let newApplication = new applicationModel({
        fullName,
        email,
        phoneNumber,
        jobId,
        jobRole,
        resume
      });
      await newApplication.save();
      res.status(201).json({ message: "sucessfully applied", newApplication });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong inthe server" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    let allApplications = await applicationModel.find();
    res.status(200).json(allApplications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};
