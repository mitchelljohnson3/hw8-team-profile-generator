const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inq = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const HTMLrenderer = require("./lib/htmlRenderer");
const render = new HTMLrenderer();

inq.prompt([
    {
        message: "How many Engineers are in your team?",
        name: 'numEngineers'
    },
    {
        message: "How many Interns?",
        name: "numInterns"
    }
]).then( (answers) => {
    getTeamData(answers.numEngineers, answers.numInterns);
})

function getTeamData(numEngineers, numInterns) {

    inq.prompt([
        {
            message: "What is your name?",
            name: "name"
        },
        {
            message: "What is your email?",
            name: "email"
        },
        {
            message: "What is your office number?",
            name: "office"
        },
    ]).then( (answers) => render.addTeamMember(answers, 'Manager'));

    for(let i = 0; i < numEngineers; i++) {
        inq.prompt([
            {
                message: "What is your name?",
                name: "name"
            },
            {
                message: "What is your email?",
                name: "email"
            },
            {
                message: "What is your github username?",
                name: "username"
            },
        ]).then( (answers) => render.addTeamMember(answers, 'Engineer'));
    }
    for(let i = 0; i < numInterns; i++) {
        inq.prompt([
            {
                message: "What is your name?",
                name: "name"
            },
            {
                message: "What is your email?",
                name: "email"
            },
            {
                message: "What school do you attend?",
                name: "school"
            },
        ]).then( (answers) => render.addTeamMember(answers, 'Intern'));
    }

    render.createPage(outputPath);
}