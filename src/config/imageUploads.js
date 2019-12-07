// const multer = require('multer');
// const path = require('path');

// module.exports = {
//     dest: path.resolve(__dirname, '..', '..','uploads'),
//     storage: multer.diskStorage({
//         destination:(req,file,cb) =>{
//             cb(null,path.resolve(__dirname, '..', '..', 'uploads'));
//         },
//         filename: (req,file,cb) => {
//             const ext = path.extname(file.originalname)
//             const name = path.basename(file.originalname, ext)
//             cb(null, `${name}-${Date.now()}${ext}`)
//         }
//     })
// }

const multer = require('multer');
const path = require('path');
const cryto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..','uploads'),
    storage: multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,path.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req,file,cb) => {
            cryto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                
                cb(null,file.key);
            })
        }
    })
};