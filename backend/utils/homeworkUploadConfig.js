const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dv8fo0kwp',
  api_key: '743389986612331',
  api_secret: 'bimwKUNBHoCuBNstHjmOZmR3HKU',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'home_work',
    format: async (req, file) => 'pdf',
    public_id: (req, file) => `pdfFile_${Date.now()}`,
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
