import multer from 'multer';
import path from 'path';
import fs from 'fs';

// dynamic path resolver
const getStorage = (folderName) => {
    const fullPath = path.join('uploads', folderName);
    fs.mkdirSync(fullPath, { recursive: true });

    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, fullPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
};

// Middlewares
export const uploadAvatar = multer({ storage: getStorage('avatars') });
export const uploadQuestionImage = multer({ storage: getStorage('exam/questions') });
