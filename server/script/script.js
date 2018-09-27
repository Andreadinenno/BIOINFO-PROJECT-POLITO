const exec = require('child_process').exec;



const startScript  = async (options) => {

    child = exec('./script/./isomir_sea -h',(error, stdout, stderr)  =>  {

        console.log('stdout: ' + stdout);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

}

module.exports = {startScript}