const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");
const md5 = require("md5");
const mkdirp = require("mkdirp");
const script = require("../script/script");

module.exports = app => {
  // configure storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //directory -> root is server ->
      cb(null, `./script`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });

  //route
  app.post("/api/request", upload.any(), async function(req, res) {
    console.log(req.body);

    //run asynchronous script with error handling
    try{
      data = await script.startScript(req.body);
      res.send(data);
    } catch(error){
      res.status(500).send(error.message);
    }

  });
};
