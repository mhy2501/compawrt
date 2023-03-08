import multer from "multer";
import path from "path";

// multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".PNG" &&
      ext !== ".JPG" &&
      ext !== ".JPEG" &&
      ext !== ".GIF" &&
      ext !== ".gif"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export { upload };
