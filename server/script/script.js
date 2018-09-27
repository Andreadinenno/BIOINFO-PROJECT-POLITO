const exec = require('child_process').exec;
const fs = require('fs');


const startScript  = async (options) => {

    child = exec('./script/./isomir_sea -h',(error, stdout, stderr)  =>  {

        fs.writeFile('output.txt',stdout, () => {
            console.log("saved")
        });
        

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

}

module.exports = {startScript}