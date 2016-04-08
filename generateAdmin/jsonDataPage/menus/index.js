var fs          = require('fs');
var Model       = require('adminDBModels/menus').Menu;
var path        = require('path');
var yum 	    = 0;                                        // счетчик для определения завершения чтения
var directory   = 'jsonDataPage/menus';
var jsonFiles   = [];

module.exports = function (callback){
    fs.readdir( directory, function(err, files){ 	        // открываем текущую директорию
        if (err) { console.log(err) }
        files.forEach( function(filename){
            path.extname(filename) == ".json" ? jsonFiles.push(filename) : false;
        });
        jsonFiles.forEach( function(jsonFile){		            // для каждого файла в текущей директории
            fs.readFile(directory+'/'+jsonFile, function(err, data) { // читаем json файл
                var saveD = new Model(JSON.parse(data));// данные из файла json в переменную
                saveD.save(function(err) {              // сохраняем наши данные
                    if (err) throw err;
                    yum+=1;
                    yum==jsonFiles.length ? callback(null, 1) : false
                });
            });
        });
    });
};