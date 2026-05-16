// Підключається залежності
var express = require("express");
var bodyParser = require("body-parser");

// Вмикається express
var app = express();

// Вмикається body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Налаштовання EJS
app.set("view engine", "ejs");

// Масив доданих завдань
var task = ["Опанувати JavaScript", "Опанувати Node.js"];

// Масив виконаних завдань
var complete = ["Опанувати HTML та CSS", "Опанувати Git та GitHub"];

// Додавання нового завдання
app.post("/addnewtask", function(req, res) {
    var newTask = req.body.newtask;

    task.push(newTask);

    res.redirect("/");
});

// Переміщення у виконані
app.post("/movetocompletetask", function(req, res) {
    var completeTask = req.body.check;

    if (typeof completeTask === "string") {

        complete.push(completeTask);

        task.splice(task.indexOf(completeTask), 1);

    } else if (typeof completeTask === "object") {

        for (var i = 0; i < completeTask.length; i++) {

            complete.push(completeTask[i]);

            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }

    res.redirect("/");
});

// Видалення завдань
app.post("/deletetask", function(req, res) {

    var deleteTask = req.body.check;

    if (typeof deleteTask === "string") {

        task.splice(task.indexOf(deleteTask), 1);

    } else if (typeof deleteTask === "object") {

        for (var i = 0; i < deleteTask.length; i++) {

            task.splice(task.indexOf(deleteTask[i]), 1);
        }
    }

    res.redirect("/");
});

// Головна сторінка
app.get("/", function(req, res) {

    res.render("index", {
        task: task,
        complete: complete
    });

});

// Запуск сервера
app.listen(3000, function() {

    console.log("Сервер працює на порту 3000!");

});