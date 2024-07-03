const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];
app.use(express.json());
app.get('/courses',(req,res) => {
    res.json(courses);
});
app.get('/courses/:id', (req, res) => {
    console.log('Received request for course ID:', req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }
    res.send(course);
});
app.post('/courses',(req,res) => {
    console.log(req.body);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    
    if (!req.body.name) return res.status(400).send('Course name is required');
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});