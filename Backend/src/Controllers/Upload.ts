import multer from "multer";

const FYLE_TYPE_MAP : any = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/svg+xml': 'svg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req && file){
            cb(null, 'src/public/upload')
        }
    },
    filename: function (req, file, cb) {
        if(req){}
        const extension = FYLE_TYPE_MAP[file.mimetype]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
export const upload = multer({ storage: storage })