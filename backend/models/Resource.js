const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  subject: { type: String, required: true },
  semester: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Resource', resourceSchema);
