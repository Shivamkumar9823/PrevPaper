const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Resource = require('../models/Resource');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadOnCloudinary } = require('../utiles/cloudinary');
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Fetch all resources
router.get('/', authMiddleware, async (req, res) => {
  try {
    const resources = await Resource.find().populate('uploadedBy', 'name');
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// Upload a resource
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  const { branch, subject, semester } = req.body;

  try {
    // Local file path
    const localFilePath = path.join(__dirname, '../uploads', req.file.filename);

    // Upload to Cloudinary
    const cloudpath = await uploadOnCloudinary(localFilePath);
    console.log("cloudinary path : ",cloudpath)

    // fs.unlinkSync(localFilePath);

    // Save resource to the database
    const resource = new Resource({
      branch,
      subject,
      semester,
      fileUrl: cloudpath, // Use the Cloudinary URL
      uploadedBy: req.user._id,
    });
    
    console.log("resorce before saving : ", resource)  
    await resource.save();

    res.status(201).json({ message: 'Resource uploaded successfully', resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});




module.exports = router;
