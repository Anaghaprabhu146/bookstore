const multer = require("multer");

// storage

const storage = multer.diskStorage({
  // locatio to store file
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },
  // modfiy the file name
  filename: (req, file, callBack) => {
    let date =  Date.now();
    callBack(null, `Bookstore-${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    callBack(null, true);
    // procced to save
  } else {
    callBack(null, false);
    // return an error
  }
};

const multerConfig = multer({storage, fileFilter});

module.exports = multerConfig;
