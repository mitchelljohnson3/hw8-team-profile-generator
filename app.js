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

const man = new Manager('bill', 1, 'bob@email.com', 5);
console.log(man.getRole());