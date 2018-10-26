const exec = require("child_process").exec;
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const xlsx = require("xlsx");

const startScript = async options => {
  return new Promise((resolve, reject) => {
    //create command string
    let root = path.resolve(__dirname); // /server/script
    let cmd = "./isomir_sea";

    for (var key in options) {
      cmd = cmd + " -" + key + " " + options[key];
    }

    let data;
    //the output directory is generated from the tag file name without the .txt
    let outputDir = root +  "/" + options['ift'].slice(0, -4);

    //run isomir sea - asynchronous operation
    child = exec(cmd, {cwd: root}, async (error, stdout, stderr) => {
      if (error !== null) {
        console.log("exec error: " + error);
        reject();
      }

      try{
        data = await processData(outputDir);
        console.log("5");
        resolve(data);
      } catch (err){
        console.log("6");
        reject(err);
      }
    });
  });
};

const processData = async dir => {
  return new Promise(async (resolve, reject) => {
    try{
      var lines = await getAlligmentInfo(dir);

      try{
        var alig = await getAllignmentData(dir);
        deleteFolderRecursive(dir);

        var returnData= {"log": lines, "alig": alig};
        resolve(returnData);

      }catch(err){
        areject(err);
      }
    }catch(err){
      reject(err);
    }
    /*
    getAlligmentInfo(dir).then(lines =>
      getAllignmentData(dir).then(data => {
        deleteFolderRecursive(dir);

        var returnData = {"log": lines, "alig": data};
        resolve(returnData);
      })
    ) */
  });
}

const getAllignmentData = async dir => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.readFile(dir + "/tagMir-all.tab");
      const sheet_name_list = workbook.SheetNames;
      const jsonSheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list]);

      //filter the entire table with relevant fields
      const returnObject = {};
      for(var i=0; i<jsonSheet.length; i++){
        const values = [];
        values.push(jsonSheet[i]['MIM']);
        values.push(jsonSheet[i]['TS']);
        values.push(jsonSheet[i]['TC']);
        values.push(jsonSheet[i]['MS']);
        values.push(jsonSheet[i]['AS']);
        values.push(jsonSheet[i]['IEX']);
        values.push(jsonSheet[i]['I5P']);
        values.push(jsonSheet[i]['IMS']);
        values.push(jsonSheet[i]['ISN']);
        values.push(jsonSheet[i]['I3P']);
        values.push(jsonSheet[i]['INS']);
        values.push(jsonSheet[i]['IOS']);
        values.push(jsonSheet[i]['ISS']);
        values.push(jsonSheet[i]['IPS']);
        values.push(jsonSheet[i]['ICS']);
        values.push(jsonSheet[i]['MSD']);

        returnObject[i] = values;
      }

      resolve(returnObject);
    } catch (e) {

      reject(e);
    }
  });
};

const getAlligmentInfo = async dir => {
  return new Promise((resolve, reject) => {
    try{

      let fileInterface = readline.createInterface({
        input: fs.createReadStream(dir + "/align.log")
      });

      let returnLogInfo = {};
      let numLine = 0;
      fileInterface.on("line", line => {
        numLine ++ ;
        //saving from the 97th line
        if(numLine > 97)
          returnLogInfo[numLine - 97] =  line.split("=")[1]
      });

      fileInterface.on("close", () => {
        resolve(returnLogInfo);
      });
    }catch(err){
      reject(err);
    }
  });
};

const deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

module.exports = { startScript };
