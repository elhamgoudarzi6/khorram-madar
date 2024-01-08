import multer, { diskStorage } from 'multer';
import { generate } from 'randomstring';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, generate({ charset: '123456789', length: 4 }) + '-' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/gif" || file.mimetype === "application/rar" || file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const uploadFile = multer({
    storage: storage,
    limits: { fileSize: 5 * 1000 * 1000 },
    fileFilter: filter
}).single("file");

export const uploadFiles = multer({ storage: storage }).array("files", 20);


