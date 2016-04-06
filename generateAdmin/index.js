var fs      = require('fs');
var Menu    = require('adminDBModels/menus').Menu;
var Material    = require('adminDBModels/materials').Material;
var Widget    = require('adminDBModels/widgets').Widget;
var path    = require('path');

var dir_d   = ['jsonDataPage/menus','jsonDataPage/materials','jsonDataPage/widgets'];
var param_O = [ Menu, Material, Widget];

function jsonData_parse() {

    for(var i = 0; i < dir_d.length; i++) {

        var mypath = dir_d[i];
        var myObj = param_O[i];

        fs.readdir(mypath, function(err, files){
            if(err){throw err}
            files.forEach(function(filename){
                var ext = path.extname(filename);
                if(ext == '.json'){
                    fs.readFile(mypath+'/'+filename, 'utf8', function(err,data){
                        if(err){throw err}
                        var sData = new myObj(JSON.parse(data));
                        sData.save(function(err){
                            if (err) throw err;
                        });
                    });
                }
            });
        });

        var menuModel_arr   = '';
        myObj.find( {} , function(err, data) {
            console.log(data);
        })
    }
}

jsonData_parse();
