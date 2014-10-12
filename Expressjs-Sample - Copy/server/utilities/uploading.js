var fs = require('fs');

var FILES_DIR = __dirname + '/../../public/user-images';

module.exports = {
    createDir: function (path, dirName) {
        dirName = dirName || '';
        fs.mkdirSync(FILES_DIR + path + dirName);
    },
    saveFile: function (file, path, fileName) {
        if (!fs.existsSync(FILES_DIR + path)) {
            this.createDir(path);
        }

        var fstream = fs.createWriteStream(FILES_DIR + path + fileName);
        file.pipe(fstream);
    },
    moveFile: function (oldPath, newPath, fileName) {
        if (!fs.existsSync(FILES_DIR + newPath)) {
            this.createDir(newPath);
        }
    }
};