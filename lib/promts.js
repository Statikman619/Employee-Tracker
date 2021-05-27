// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require("../db");
const colors = require("colors")

// The initial question, to discover which action the user wants to perform
function firstQ() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add, view, or modify information?",
      name: "firstQChoice",
      choices: ["add", "view", "modify"]
    }