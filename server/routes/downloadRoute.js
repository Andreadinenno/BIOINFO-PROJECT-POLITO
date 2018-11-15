const JSZip = require("jszip");
const fs = require('fs');
const path = require('path');
var Blob = require('blob');
const streamToBuffer = require('stream-to-buffer');

module.exports = app => {
  app.get('/api/download/', (req,res) => {
    console.log(req.body);
    //console.log(req.query.id);
    var folderId = req.query.id.slice(0, -4);
    var filename = req.query.file;
    var stat, filePath;
    filePath = path.join(__dirname, "../script/", folderId, "/", filename);
    stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res)
  });
};
