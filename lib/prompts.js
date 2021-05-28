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
   ]).then(function(deptAnswers){
    if (deptAnswers.firstQChoice === "add") {
      addWhat(deptAnswers)
      } else if (deptAnswers.firstQChoice === "view") {
      viewWhat(deptAnswers)
      } else {
      modifyWhat(deptAnswers)
      }
  });  
} 

// If the user wants to add an entry, this specifies what they would like to add and calls the function
function addWhat() {
  inquirer.prompt([
    {
      type: "list",
      message: "Sounds good, what would you like to add?",
      name: "addWhatChoice",
      choices: ["New Department", "New Role", "New Employee"]
    }
  ]).then(function(addWhatAnswers){
    if (addWhatAnswers.addWhatChoice === "New Department") {
      addDept()
    } else if (addWhatAnswers.addWhatChoice === "New Role") {
      addRole()
    } else {
      addEmployee();
    }
  })
}
// If the user wants to view a table, this specifies what they would like to view and calls the function
function viewWhat() {
    inquirer.prompt([
      {
        type: "list",
        message: "Sounds good, what would you like to view?",
        name: "viewWhatChoice",
        choices: ["Departments", "Roles", "Employees"]
      }
    ]).then(function(viewWhatAnswers){
      if (viewWhatAnswers.viewWhatChoice === "Departments") {
        viewDept()
      } else if (viewWhatAnswers.viewWhatChoice === "Roles") {
        viewRole()
      } else {
        viewEmployee();
      }
    })
}
// If the user wants to modify an entry, this specifies what they would like to change and calls the function
function modifyWhat() {
    inquirer.prompt([
      {
        type: "list",
        message: "Sounds good, what would you like to do?",
        name: "modifyWhatChoice",
        choices: ["Change an employee's manager", "Change an employee's role"]
      }
    ]).then(function(modifyWhatAnswers){
        if (modifyWhatAnswers.modifyWhatChoice === "Change an employee's manager") {
          modifyMgrEmplSel()
        } else {
          modifyRoleEmplSel()
        }
      })
}
// Function to create a new department
function addDept(){
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter the department name",
      name: "addDeptAnswer",
    }
  ]).then(function(newDeptResults){
    db.connection.query(
      "INSERT INTO department SET ?",
      {
        name: newDeptResults.addDeptAnswer,
      },
      function(err, res) {
        if (err) throw err;
      console.log(`Success!  You have added the department ${newDeptResults.addDeptAnswer}`.underline.brightGreen)
      continueOption();
  })}
)};
// Function to create a new role
function addRole() {
    db.connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
            inquirer.prompt([
            {
            type: "input",
            message: "Please enter the name of the job title",
            name: "addRoleTitle",
            },
            {
            type: "input",
            message: "What is the salary for this position?",
            name: "addRoleSalary",
            },
            {
            type: "list",
            message: "In which department will this role be?",
            name: "addRoleDept",
            choices: function(){
                const choiceArrayDepts = []
                for (let i = 0; i<res.length; i++) {
                    choiceArrayDepts.push(`${res[i].id} | ${res[i].name}`);
                }
                return choiceArrayDepts
            }
            },
        ]).then(function(newRoleResults){
            if (newRoleResults.addRoleSalary != parseInt(newRoleResults.addRoleSalary)) {
              console.log(`The salary must be numbers only, without letters or special characters.  Please try again.`.underline.red);
              addRole();
            } else {
              db.connection.query("INSERT INTO role SET ?",
                {
                title: newRoleResults.addRoleTitle,
                salary: newRoleResults.addRoleSalary,
                department_id: parseInt(newRoleResults.addRoleDept.slice(0, 3))
                },
              function(err, res) {
                if (err) throw err;
                console.log(`Success!  You have added the role ${newRoleResults.addRoleTitle}`.underline.brightGreen)
                continueOption();
              })}  
          })
    }
)}
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







// Function that appears at the end of each operation, to redirect to the beginning prompt if the user want to perform another action









