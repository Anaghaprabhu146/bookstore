// import multer

const multer = require("multer");

// diskstorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    let date = Date.now();
    cb(null, `Bookstore-resume-${date}-${file.originalname}`);
  },
});

// storage

// filename

// validation-filefilter
 const fileFilter= (req, file, cb) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const resumeMulterConfig=multer({storage,fileFilter})

module.exports=resumeMulterConfig