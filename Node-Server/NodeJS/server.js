var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function (req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'content-type': 'text/html'});
            res.write('received upload:\n\n');
            res.write('JavaScript is in the Sandbox and you can view the uploaded file from the link in the console after clicking this: ');
            res.end(
                    '<a href="file:///' + files.upload.path + '">Uploaded File</a>'
            );
        });

        return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
    );
}).listen(8080);

console.log('Server is running on PORT: 8080');