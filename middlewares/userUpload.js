import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/user-images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log("Only jpg, jpeg and png files allow");
      throw Error("Only jpg, jpeg and png files allow");
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

export default upload;
