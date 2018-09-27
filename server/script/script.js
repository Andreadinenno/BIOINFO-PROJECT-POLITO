const exec = require('child_process').exec;
const fs = require('fs');


const startScript  = async (options) => {

   /* console.log(options);
    options.map ((key,value) => {
        console.log("map");
    });*/

    let fileName = 'GSM337570-tbl-1.txt';
    let cmd = './script/./isomir_sea -ift ./script/' + fileName + ' -ifm ./script/db/mature.fa  -v 1 -sc hsa'

    child = exec(cmd,(error, stdout, stderr)  =>  {

        if (error !== null) {
            console.log('exec error: ' + error);
            return;
        }
        //filename 
        const dir = fileName.slice(0,-4);
        processData(dir);
    });
}

const processData = async (dir) => {
    console.log(dir);
    fs.readFile('./script/'+ dir +'/align.log' , (err,data) => {
        if (!err)
            console.log(data.toString('utf8'));
        else   
            console.log(err);
    })
}


module.exports = {startScript}