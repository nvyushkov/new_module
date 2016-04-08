var Menu        = require('adminDBModels/menus').Menu;
var Material    = require('adminDBModels/materials').Material;
var Widget      = require('adminDBModels/widgets').Widget;
var async       = require('async');
var Models      = [ Menu, Material, Widget]; // добавляем наши модеи в массив

var materialParse   = require('./jsonDataPage/materials');
var menuParse       = require('./jsonDataPage/menus');
var widgetParse     = require('./jsonDataPage/widgets');

var adminElementsRead = function() {
    Models.forEach(function (model) {  // для каждой коллекции
        model.find({}, function (err, data) { // ищем в текущей коллекции все данные
            if (err) throw err;
            console.log(data)
        });
    });
};

async.waterfall([
    function(callback) {
        materialParse( function(err, result) {
            if (err) { callback("Материалы jSON не считаны") }
            callback(null, result)
        })
    },
    function(result, callback) {
        menuParse( function(err, result) {
            if (err) { callback("Меню jSON не считаны") }
            callback(null, result)
        })
    },
    function(result, callback) {
        widgetParse( function(err, result) {
            if (err) { callback("Виджеты jSON не считаны") }
            callback(null, result)
        })
    }
], function(err, result){
    result == 1 ? adminElementsRead() : console.log("error")
});