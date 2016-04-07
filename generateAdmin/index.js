var fs          = require('fs');
var Menu        = require('adminDBModels/menus').Menu;
var Material    = require('adminDBModels/materials').Material;
var Widget      = require('adminDBModels/widgets').Widget;
var path        = require('path');
var dir_d       = ['jsonDataPage/menus','jsonDataPage/materials','jsonDataPage/widgets']; // все пути для jSON файлов внутри модуля
var param_S     = [ Menu, Material, Widget]; // добавляем наши модеи в массив
var yum 	= 0; // счетчик для определения завершения чтения

function pushDataJson(){
    dir_d.forEach( function(directory){  		// для каждого элемента массива директорий
        fs.readdir( directory, function(err, files){ 	// открываем текущую директорию
            if (err) { console.log(err)}		
            files.forEach( function(filename){		// для каждого файла в текущей директории
                if ( path.extname(filename) == ".json" ) { // проверяем расширение файла на .json
                    fs.readFile(directory+'/'+filename, function(err, data) { // читаем json файл
                        var indexDir = dir_d.indexOf(directory); // берем индекс директории в массиве
                        var model = param_S[indexDir]; // считаем нужную нам модель в массиве моделе
                        var saveD = new model(JSON.parse(data)); // данные из файла json в переменную
                        saveD.save(function(err) { // сохраняем наши данные
                            if (err) throw err;
                            yum+=1; // увеличиваем количество пройденных элементов
				// если прошли все элементы и записали в базу - вызываем функцию чтения
                            yum==dir_d.length? read() : false 
                        });
                    });
                }
            } );
        });
    });
}

function read(){
    param_S.forEach(function (modelName) {  // для каждой коллекции
        modelName.find({}, function (err, data) { // ищем в текущей коллекции все данные
            if (err) throw err;
            console.log(data); // выводим данные из базы
        });
    });
}

pushDataJson();  //вызываем функцию работы с файлами json
