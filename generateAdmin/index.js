var fs          = require('fs');
var Menu        = require('adminDBModels/menus').Menu;
var Material    = require('adminDBModels/materials').Material;
var Widget      = require('adminDBModels/widgets').Widget;
var path        = require('path');

var dir_d       = ['jsonDataPage/menus','jsonDataPage/materials','jsonDataPage/widgets']; // все пути для jSON файлов внутри модуля
var param_S     = [ Menu, Material, Widget]; // добавляем наши модеи в массив
var i           = 0;

// Парсим файлы jSon из директорий, сохраняем из них данные,  получаем записи из базы нужной коллекции и отдаем их
var jsonDateTransfer = function(callback) {

    for(i=0; i<param_S.length; i++) {  // перебираем массив с моделями, пока весь не перебран, вызываем функию чтения директории
        var dir = dir_d[i];
        var par = param_S[i];
        readDir(dir, par);
    }
    setTimeout(callback, 100);  // т.к. нод синхрон - то немного разрываем время что бы колбек вызывался после цикла
};

// читаем директорию
var readDir = function(dir, par) {
    fs.readdir( dir, function(err, files) { 
        if (err) throw err;
        files.forEach( function(filename) { // пеербираем каждый файл в директории
            var ext = path.extname(filename); // берем расширение текущего файла
            if ( ext == '.json' ) { // является ли текущий файл .json
                fs.readFile( dir +'/' + filename, function(err, data) {  // читаем текущий .json файл
                    if (err) throw err; 
                    var saveData = new par(JSON.parse(data));  // парсим данные файла в json и заносим в переменную
                    saveData.save(function(err) {  // сохраняем переменную  базу
                        if (err) throw err;
                    })
                } )
            }
        } )
    });
};

// функция забирает все данные из базы наших коллекций в массиве param_S
var baseRead = function() {
    param_S.forEach( function(modelName) {  // для каждой коллекции 
        modelName.find( {} , function(err, data) { // ищем в текущей коллекции все данные
            if (err) throw err;
            console.log(data); // выводим данные текущей коллекции
        });
    } )
};

jsonDateTransfer( function() { baseRead() } );  // вызываем цель функций

