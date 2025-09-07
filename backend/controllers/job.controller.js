import { Job } from "../models/job.model.js";


export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log("Error in postJob:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error in getAllJobs:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate("company")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("Error in getJobById:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error in getAdminJobs:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    existingJob.title = title || existingJob.title;
    existingJob.description = description || existingJob.description;
    existingJob.requirements = requirements
      ? requirements.split(",")
      : existingJob.requirements;
    existingJob.salary = salary ? Number(salary) : existingJob.salary;
    existingJob.location = location || existingJob.location;
    existingJob.jobType = jobType || existingJob.jobType;
    existingJob.experienceLevel = experience || existingJob.experienceLevel;
    existingJob.position = position || existingJob.position;
    existingJob.company = companyId || existingJob.company;

    await existingJob.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job: existingJob,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateJob:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const getJobsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
      console.log("Fetching jobs for company ID:", companyId);
    const jobs = await Job.find({ company: companyId }).populate("company");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this company.",
        success: false,
      });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
