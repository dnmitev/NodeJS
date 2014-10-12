var fs = require("fs"),
    files = fs.readdirSync(__dirname + "/models");

for (var i = 0, len = files.length; i < len; i += 1) {
    var currentFile = files[i],
        currentModel = require("./models/" + currentFile);

    currentModel.seed();
}