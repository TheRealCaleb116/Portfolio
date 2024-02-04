//Run to build the project to a static state
const pth = require("path")
var fs = require("fs");
var ejs = require("ejs");
var sass = require("sass");


//Directories
const dir = "./src";
const ouputDir = "./docs";
const exclude = "Partials";

global.buildRoot = pth.join( pth.resolve(__dirname), "/src");


//Get all the files in src directory
const files = fs.readdirSync(dir, {recursive: true});

files.forEach(localPath => {
    //Build the full path
    var filePath = pth.join(dir,localPath);

    //Check if this is path we should ignore
    if (filePath.includes(exclude) == true) { return;}
    var fileStats = fs.statSync(filePath);
    if (fileStats.isFile() == true){
        //Check what type of file an build accordingly
        var exst = filePath.split(".").pop();
        if (exst == "ejs"){
            //Build to html
            fs.readFile(filePath, "utf-8", function(err,data){
                //Error check
                if (err) { console.log(err);}

                //Compile EJS
                var tmpl = ejs.compile(data);
                var html = tmpl();
                //Write output to dir
                fs.writeFile(pth.join(ouputDir,localPath.replace(".ejs",".html")), html, function(err){
                    if (err){console.log(err);}
                });

            });
            
        }else if (exst == "scss"){
            //Build to CSS
            var result = sass.compile(filePath);
            //Write output to dir
            fs.writeFile(pth.join(ouputDir,localPath.replace(".scss",".css")), result.css, function(err){
                if (err){console.log(err);}
            });

        }
    }
});
