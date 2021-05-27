// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require("../db");

// The initial question, to discover which action the user wants to perform
function firstQ() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add, view, or modify information?",
      name: "firstQChoice",
      choices: ["add", "view", "modify"]
    }

// If the user wishes to add an entry, this specifies what they would like to add and calls the appropriate function





// If the user wishes to view a table, this specifies what they would like to view and calls the appropriate function






// If the user wishes to modify an entry, this specifies what they would like to change and calls the appropriate function





// Function to create a new department




// Function to create a new role




//Function to begin adding a new employee




// Function that produces the manager and employee ids, to assign the appropriate manager to an employee





// Function that physically adds the manager_id attribute into the employee entry, where appropraite





// Function to view all departments







// Function to view all roles







// Function to view all employees







// Function to select which employee whose role we will be modifying







// Function to select which role we will be changing the employee to






// Function to select which employee whose manager we will be modifying








// Function to select and assign the correct manager to the aforementioned employee







// Function that appears at the end of each operation, to redirect to the beginning prompt should the user want to perform another action









