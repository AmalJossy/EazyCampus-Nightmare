const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/nightmare', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    let display=(x)=> res.send(x)
    nightmare
        .goto('http://210.212.227.210/tkmce/')
        .wait('#btnLogin')
        .type('#txtUserName', username)
        .type('#txtPassword', password)
        .click('#btnLogin')
        .wait("[href='../../Student/SubjectwiseAttendanceStudent.aspx']")
        .click("[href='../../Student/SubjectwiseAttendanceStudent.aspx']")
        .wait('#TABLE2')
        .type('#ctl00_ContentPlaceHolder1_txtFromdate', '01/08/2018')
        .type('#ctl00_ContentPlaceHolder1_txtToDate', '31/12/2050')
        .click('#ctl00_ContentPlaceHolder1_btnSearch')
        .wait('#ctl00_ContentPlaceHolder1_tblStudentDetails')
        .evaluate(() => document.querySelector('#ctl00_ContentPlaceHolder1_tblStudentDetails ').innerHTML)
        .end()
        .then(display)
        .catch(error => {
            res.status(400).send('Search failed:', error)
        })
})

app.listen(3000,()=>{
    console.log('Nightmares on port 3000');
})
