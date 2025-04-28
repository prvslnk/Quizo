import multer from 'multer';
import path from 'path';

// Storage setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    },
});

// File type validation (optional, here allowing only images)
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

// Middleware for upload
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Single file upload controller
const uploadSingleFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: `/uploads/${req.file.filename}`,
    });
};

export { upload, uploadSingleFile };
