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
    folder: 'profile_pics',
    format: async (req, file) => 'png',
    public_id: (req, file) => `profilePic_${Date.now()}`,
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
