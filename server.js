const express        = require('express');
const hbs            = require('hbs');
const fs             = require('fs');

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

