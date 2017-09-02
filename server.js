const express        = require('express');
const hbs            = require('hbs');
const fs             = require('fs');

var app = express();

// Register Partials
hbs.registerPartials(__dirname + '/views/partials');

// Set view engine
app.set('view engine', 'hbs');

// Set folder for static files
app.use(express.static(__dirname + '/public'));

// Middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.path} \n`;

    fs.appendFileSync('server.log', log, (err) => {
        if (err) { console.log('Cant write to server.log'); }
    });

    console.log(`${now}: ${req.method} ${req.path}`);
    next()
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// Register Helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'home page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'fug',
    });
});

app.listen(3000, () => {
    console.log('Server listening to port 3000.');
});

