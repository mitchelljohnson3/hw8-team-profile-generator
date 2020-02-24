const fs = require('fs');

class htmlRenderer {
    constructor() {
        this.teamMembers = [];
        this.firstPart = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Team</title>
        </head>
        <body>
        
            <div id="header">My Team</div>
            <div id="container">`;
        this.lastPart = `</div><style>
        body{
            padding: 0;
            margin: 0;
        }
        #header {
            width: 100%;
            height: 100px;
            background-color: red;
            text-align: center;
            color: white;
            font-size: 50pt;
        }
        #container{
            height: 100%;
            padding: 8%;
        }
        #teamMember{
            height: 300px;
            width: 200px;
            background-color: lightblue;
            border-radius: 5%;
            padding: 10px;
            float: left;
            margin: 3%;
        }
        </style>
        </body>
        </html>`;
    }
    // converts data in teamMember into styled div and adds it to the array
    addTeamMember(teamMember) {
        let temp = '';
        const role = teamMember.getRole();
        switch (role) {
            case 'Manager':
                temp = 'Office Number: ' + teamMember.getOfficeNumber();
                break;
            case 'Engineer':
                temp = 'GitHub: ' + teamMember.getGithub();
                break;
            case 'Intern':
                temp = 'School: ' + teamMember.getSchool();
                break;
        }

        const template = `<div id="teamMember">
            <h1>${teamMember.getName()}</h1>
            <h1>${role}</h1>
            <h3>ID: ${teamMember.getId()}</h3>
            <h3>Email: ${teamMember.getEmail()}</h3>
            <h3>${temp}</h3>
        </div>`;
        this.firstPart += template;
    }
    createPage(path) {
        const file = this.firstPart + this.lastPart;
        fs.writeFile(path, file, (err) => {
            if (err) throw err;
            console.log('Success!');
        })
    }
}

module.exports = htmlRenderer;