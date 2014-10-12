var fs = require("fs"),
    files = fs.readdirSync(__dirname + "/controllers"),
    controllers = {};

for (var i = 0, len = files.length; i < len; i += 1) {
    var currentFile = files[i],
        currentController = require("./controllers/" + currentFile);

    controllers[currentController.name] = currentController;
}

module.exports = controllers;