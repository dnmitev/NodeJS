// unit of work
var fs = require("fs"),
    files = fs.readdirSync(__dirname + "/repos"),
    repositories = {};

for (var i = 0, len = files.length; i < len; i += 1) {
    var currentFile = files[i],
        currentRepository = require("./repos/" + currentFile);

    repositories[currentRepository.name] = currentRepository;
}

module.exports = repositories;