import multer from "multer";
import path, { dirname } from "path";

const storage = multer.diskStorage({
  // destination: path.resolve(__dirname, '../uploads'),
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb){
    cb(
      null,
      file.filename + "-",
      + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;
