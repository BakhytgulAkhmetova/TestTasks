import { add } from '../postRequest/course'
import { Course } from '../entities/Course';
import * as fs from 'fs';
import * as data from '../db/main.json';

module.exports = function (server) {
    let json = JSON.parse(data.toString());
    server.post('/courses/new ', async (req, res) => {
        const course = new Course({
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            duration: req.body.duration,
            authorList: req.body.authorList }
        ); 
        await add(course, json);
        fs.writeFile('../db/main.json', JSON.stringify(json), (err) =>  err);
        res.status(200);
    });
}
