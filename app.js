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

let numberEngineers = 0;
let numberInterns = 0;

inq.prompt([
    {
        message: "How many engineers are in your team?",
        name: "numEngineers"
    },
    {
        message: "How many interns are in your team?",
        name: "numInterns"
    }
]).then( (answers) => {
    numberEngineers = answers.numEngineers;
    numberInterns = answers.numInterns;
    getTeamData();
})


const managerPrompt = [
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
        }
    ];
const engineerPrompt = [
        {
            message: "What is their name?",
            name: "name"
        },
        {
            message: "What is their email?",
            name: "email"
        },
        {
            message: "What is their github username?",
            name: "username"
        }
    ];
const internPrompt = [
        {
            message: "What is their name?",
            name: "name"
        },
        {
            message: "What is their email?",
            name: "email"
        },
        {
            message: "What school do they attend?",
            name: "school"
        }
    ];

let idTracker = 1;
async function getTeamData() {
    console.log('Manager Information:');
    inq.prompt(managerPrompt).then( (answers) => {
        const manager = new Manager(answers.name, idTracker, answers.email, answers.office);
        idTracker++;
        render.addTeamMember(manager);
        getEngineers();
    })
}
async function getEngineers() {
    if(numberEngineers > 0){
        console.log('New Engineer Information:');
        inq.prompt(engineerPrompt).then( (answers) => {
            const engineer = new Engineer(answers.name, idTracker, answers.email, answers.username);
            idTracker++;
            render.addTeamMember(engineer);
            getEngineers();
        });
        numberEngineers--;
    } else {
        getInterns();
    }
}
async function getInterns() {
    if(numberInterns > 0){
        console.log('New Intern Information:');
        inq.prompt(internPrompt).then( (answers) => {
            const intern = new Intern(answers.name, idTracker, answers.email, answers.school);
            idTracker++;
            render.addTeamMember(intern);
            getInterns();
        });
        numberInterns--;
    } else {
        render.createPage(outputPath);
    }
}