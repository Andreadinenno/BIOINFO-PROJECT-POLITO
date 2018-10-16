const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");
const md5 = require("md5");
const mkdirp = require("mkdirp");
//const script = require("../script/script");

module.exports = app => {
  // configure storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //directory -> root is server ->
      const sessionFolderName = md5(req);
      mkdirp(`./uploads/${sessionFolderName}`, function(err) {
        // path exists unless there was an error
      });

      cb(null, `./uploads/${sessionFolderName}`);
    },
    filename: (req, file, cb) => {
      //to create a random filename
      //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, file.originalname);
    }
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });

  //route
  app.post("/api/request", upload.any(), function(req, res) {
    console.log(req.body);

    res.send({ ok: "buddy" });

    //run script
    //script.startScript(req.body);
  });
};
