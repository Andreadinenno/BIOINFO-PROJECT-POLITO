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

    try{
      //run isomir sea - asynchronous operation
      child = exec(cmd, {cwd: root}, async (error, stdout, stderr) => {
        /*if (error !== null) {
          reject(new Error("Error executing isoMIR-SA, please double check your inputs and try again"));
        }*/
        console.log(stdout);
        console.log(stderr);

        try{
          data = await processData(outputDir);

          const fileToDelete = ['ift','ifm'];
          Object.keys(options).forEach(key => {
            if (fileToDelete.includes(key))
              deleteFile (root, options[key]);
          });

          resolve(data);
        } catch (err){
          reject(new Error("Error executing isoMIR-SEA, please double check your inputs and try again"));
        }
      });

    }catch(err){
      reject(new Error("Error executing isoMIR-SEA, please double check your inputs and try again"));
    }
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
        reject(err);
      }
    }catch(err){
      reject(err);
    }
  });
}

const deleteFile =  (root ,file) => {
    try{
      console.log("remove " + root + '/' + file)
      fs.unlinkSync(root + '/' + file);
    }catch(e){
      console.log(e);
    }
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
        values.push(jsonSheet[i]['MIN']);
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

      console.log(dir);
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
