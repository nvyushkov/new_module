var fs          = require('fs');
var Model       = require('adminDBModels/materials').Material;// загружаем можель модуля
var path        = require('path');
var yum         = 0;                                      // счетчик для определения завершения чтения
var directory   = 'jsonDataPage/materials';               // путь к нашему модулю, исходя из родительского
var jsonFiles   = [];                                     // промежуточный массив json файлов

module.exports = function (callback){
    fs.readdir( directory, function(err, files){ 	        // открываем директорию
        if (err) { console.log(err) }
        files.forEach( function(filename){                // проверяем все файлы директории, файлы jSON добавляем в массив jsonFile
            path.extname(filename) == ".json" ? jsonFiles.push(filename) : false;
        });
        jsonFiles.forEach( function(jsonFile){		        // перебираем все jSON файлы в массиве jsonFile
            fs.readFile(directory+'/'+jsonFile, function(err, data) { // читаем json файл
                var saveD = new Model(JSON.parse(data));// данные из файла json в переменную, парся в формате jSON
                saveD.save(function(err) {              // сохраняем наши данные
                    if (err) throw err;
                    yum+=1; // считаем записанные файлы
                    // если количество записанных файлов равна их количеству вмассиве jsonFiles, запускаем колбек
                    yum==jsonFiles.length ? callback(null, 1) : false
                });
            });
        });
    });
};
