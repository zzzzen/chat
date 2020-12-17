import multer from "multer";
import moment from "moment";


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const date = moment().format("DDMMYYYY-HHmmss_SSS");
    cb(null, `${date}-${file.originalname}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  cb(null, file.mimetype === "image/png" || file.mimetype === "image/jpeg");
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

export const upload = multer({
  storage,
  fileFilter,
  limits
});
