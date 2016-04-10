// загружаем модули
var fs          = require('fs');
var path        = require('path');
// загружаем модели
var Material    = require('adminDBModels')('materials');
var Menus       = require('adminDBModels')('menus');
var Widget      = require('adminDBModels')('widgets');
// массив директорий jSON файлов
var dirArr      = ['./jsonDataPage/materials','./jsonDataPage/menus','./jsonDataPage/widgets'];
// массив загруженных моделей
var modArr      = [ Material, Menus, Widget ];
// переменные
var yum         = 0;
var index       = 0;
var saveD       = '';

module.exports = function(callback) {
    dirArr.forEach(function( directory ){                       // перебираем директории
        fs.readdir( directory, function(err, files){ 	        // открываем директорию
            if (err) { console.log(err) }
            files.forEach( function(jsonFile){		        // перебираем все jSON файлы в массиве jsonFile
                if (path.extname(jsonFile) == ".json") {
                    fs.readFile(directory+'/'+jsonFile, function(err, data) { // читаем json файл
                        if (err) { console.log(err)}
                        index = dirArr.indexOf(directory);
                        model = modArr[index];
                        saveD = new model(JSON.parse(data));    // данные из файла json в переменную, парся в формате jSON
                        saveD.save(function(err) {                  // сохраняем наши данные
                            if (err) { console.log(err) }
                        });
                    });
                }
            });
            yum+=1; // считаем записанные файлы
            // если количество записанных файлов равна их количеству вмассиве jsonFiles, запускаем колбек
            if ( yum==dirArr.length ){
                callback(null, "Все jsonFiles записаны")
            }
        });
    });
};
