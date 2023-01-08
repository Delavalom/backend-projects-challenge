import fs from "fs";
import multer, {type FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    console.log(file.originalname);
    const dir = "../resources/static/assets/uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    console.log(file.originalname)
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const csvFilter = (_req: unknown, file: any, cb: FileFilterCallback) => {
    console.log('reading file in middleware', file?.originalname)
    if (file === undefined) {
        cb(null, false)
    } else if (file.mimetype.includes('csv')) {
        cb(null, true)
    } else [
        cb(null, false)
    ]
}

export default multer({
    storage,
    fileFilter: csvFilter
})