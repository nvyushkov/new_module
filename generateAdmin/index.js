var Menu        = require('adminDBModels/menus').Menu;
var Material    = require('adminDBModels/materials').Material;
var Widget      = require('adminDBModels/widgets').Widget;
var async       = require('async');
var Models      = [ Menu, Material, Widget]; // добавляем наши модеи в массив

// загружаем модульные части
var materialParse   = require('./jsonDataPage/materials');
var menuParse       = require('./jsonDataPage/menus');
var widgetParse     = require('./jsonDataPage/widgets');

// функция забирает данные из базы
var adminElementsRead = function() {
    Models.forEach(function (model) {         // для каждой коллекции в массиве Models
        model.find({}, function (err, data) { // ищем в текущей коллекции все данные
            if (err) throw err;
            console.log(data)                 // выводим полученные данные
        });
    });
};

// запускаем асинхронную функцию
async.waterfall([
    function(callback) {
        materialParse( function(err, result) {    // вызываем ункцию модуля Материалов, получаем результат и отдаем дальше
            if (err) { callback("Материалы jSON не считаны") }
            callback(null, result)
        })
    },
    function(result, callback) {
        menuParse( function(err, result) {    // вызываем ункцию модуля Меню, получаем результат и отдаем дальше
            if (err) { callback("Меню jSON не считаны") }
            callback(null, result)
        })
    },
    function(result, callback) {
        widgetParse( function(err, result) {    // вызываем ункцию модуля Виджетов, получаем результат и отдаем дальше
            if (err) { callback("Виджеты jSON не считаны") }
            callback(null, result)
        })
    }
], function(err, result){
    // Если результат модулей лементов вернулись без ошибок - запускаем функцию чтения из базы
    result == 1 ? adminElementsRead() : console.log("error")
});
