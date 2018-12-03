const fs = require('fs');
const path = require('path');
var Blob = require('blob');

module.exports = app => {

  //documentation file
  app.get('/api/documentation', (req, res) => {
    console.log(req.body);

    var filename = path.join(__dirname, "../docs/isoMir_SEA_web_application.pdf");
    var stat = fs.statSync(filename);

    res.writeHead(200, {
      'Content-Type' : 'application/pdf',
      'Content-Length' : stat.size,
      'Content-Disposition': 'attachment; filename=isomiR-SEA.pdf'
    });

    var readStream = fs.createReadStream(filename);
    readStream.pipe(res);
  })

  //OUTPUT FILES
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
