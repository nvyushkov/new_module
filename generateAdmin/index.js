// подключаем модуль парсинга директории с JSON файлами
var jsonDataPage    = require('./jsonDataPage');

// иоздаем функцию, которая проверяет что вернул модуль парсинга jsonDataPage
var generateAdmin   = function(callback) {
    jsonDataPage( function(err, result) {    // проверяем что нам вернул модуль и вызываемколбэк
        if (err) { callback("файлы jSON не считаны") }
        callback(null, result)
    })
};

generateAdmin(function(err, result) { console.log(result)});