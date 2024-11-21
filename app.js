const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const EmployerJSON = require("./pracodawcy.json");

const app = express();
const port = 3000;

function searchJson(lastname){
    return EmployerJSON.pracodawcy.find(pracodawcy => pracodawcy.lastname === lastname);
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    const lastname = req.body.username;
    const result = searchJson(lastname);

    if (result) {
        res.send(`
            <html>
                <body style="background-color: black; color:white;">
                    <h1>Wynik wyszukiwania:</h1>
                    <p>Imię: ${result.imie}</p>
                    <p>Nazwisko: ${result.nazwisko}</p>
                    <p>Telefon: ${result.info.telefon}</p>
                    <p>Email: ${result.info.email}</p>
                    <p>Wiek: ${result.info.wiek}</p>
                    <a href="/">Wróć</a>
                </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
                <body>
                    <h1>Nie znaleziono pracodawcy!</h1>
                    <a href="/">Wróć</a>
                </body>
            </html>
        `);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
