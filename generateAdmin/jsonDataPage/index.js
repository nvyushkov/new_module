// загружаем модули
var fs          = require('fs');
var path        = require('path');
// загружаем модели
var Material    = require('adminDBModels/index')('materials');
var Menus       = require('adminDBModels/index')('menus');
var Widget      = require('adminDBModels/index')('widgets');
// массив директорий jSON файлов
var dirArr      = ['./jsonDataPage/materials','./jsonDataPage/menus','./jsonDataPage/widgets'];
// массив загруженных моделей
var modArr      = [ Material, Menus, Widget ];
// пустой  массив для жсон файлов
var jsonFiles   = [];
// считалка
var yum         = 0;

module.exports = function(callback) {
    dirArr.forEach(function( directory ){                       // перебираем директории
        fs.readdir( directory, function(err, files){ 	        // открываем директорию
            if (err) { console.log(err) }
            files.forEach( function(filename){                  // проверяем все файлы директории, файлы jSON добавляем в массив jsonFile
                path.extname(filename) == ".json" ? jsonFiles.push(filename) : false;
            });
            jsonFiles.forEach( function(jsonFile){		        // перебираем все jSON файлы в массиве jsonFile
                fs.readFile(directory+'/'+jsonFile, function(err, data) { // читаем json файл
                    if (err) { console.log(err)}
                    var index = dirArr.indexOf(directory);
                    var model = modArr[index];
                    var saveD = new model(JSON.parse(data));    // данные из файла json в переменную, парся в формате jSON
                    saveD.save(function(err) {                  // сохраняем наши данные
                        if (err) throw err;
                        yum+=1; // считаем записанные файлы
                        // если количество записанных файлов равна их количеству вмассиве jsonFiles, запускаем колбек
                        yum==jsonFiles.length ? callback(null, true) : false
                    });
                });
            });
        });
    });
};