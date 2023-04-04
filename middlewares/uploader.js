const multer = require('multer')
const path = require('path')




const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  }
})

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|webp/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg image"));
    }

  },
  limits: {
    fileSize: 5000000,
  }


})

module.exports = uploader