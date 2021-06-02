// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require("./db");

db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId + "\n");
  firstQ();
});

// The initial question, to discover which action the user wants to perform
function firstQ() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add, view, or modify an employee?",
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
    db.query(
      "INSERT INTO department SET ?",
      {
        name: newDeptResults.addDeptAnswer,
      },
      function(err, res) {
        if (err) throw err;
      console.log(`SUCCESS!  You have added the department ${newDeptResults.addDeptAnswer}`)
      firstQ();
  })}
)};
// Function to create a new role
function addRole() {
    db.query("SELECT * FROM department", function(err, res) {
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
              console.log(`The salary must be numbers only, without letters or special characters.  Please try again.`.red);
              addRole();
            } else {
              db.query("INSERT INTO role SET ?",
                {
                title: newRoleResults.addRoleTitle,
                salary: newRoleResults.addRoleSalary,
                department_id: parseInt(newRoleResults.addRoleDept.slice(0, 3))
                },
              function(err, res) {
                if (err) throw err;
                console.log(`Success!  You have added the role ${newRoleResults.addRoleTitle}`)
                firstQ();
              })}  
          })
    }
)}
//Function to begin adding a new employee
function addEmployee(){
  db.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
      inquirer.prompt([
        {
          type: "input",
          message: "Please enter the employee's first name",
          name: "addEmployeeNameF",
        },
        {
          type: "input",
          message: "Please enter the employee's last name",
          name: "addEmployeeNameL",
        },
        {
          type: "list",
          message: "Which team will they be joining?",
          name: "addEmployeeRole",
          choices: function(){
            const choiceArrayRoles = []
            for (let i = 0; i<res.length; i++) {
                choiceArrayRoles.push(`${res[i].id} | ${res[i].title}`);
            }
            return choiceArrayRoles
        }
        },
        { 
          type: "list",
          message: "Great, will this employee report to a manager?",
          name: "addEmployeeHasMgr",
          choices:[1,2,3,NULL]
        },
      ]).then(function(newEmployeeResults) {
        let query = db.query(
          "INSERT INTO employee SET ?",
          {
          first_name: newEmployeeResults.addEmployeeNameF,
          last_name: newEmployeeResults.addEmployeeNameL,
          role_id: parseInt(newEmployeeResults.addEmployeeRole.slice(0, 5)),
          manager_id: newEmployeeResults.addEmployeeIsMgr,
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee inserted!\n");
            if (newEmployeeResults.addEmployeeHasMgr === true) {
              console.log(`Almost there with ${newEmployeeResults.addEmployeeNameF} ${newEmployeeResults.addEmployeeNameL}, just a couple of questions about their manager`)
              getMgr()
            } else {
              console.log(`SUCCESS!  You have added` `${newEmployeeResults.addEmployeeNameF} ${newEmployeeResults.addEmployeeNameL}` `to the team!`)
              firstQ();
            }
          }
        )
      })
  })
};   
// Function that produces the manager and employee ids, to assign the appropriate manager to an employee
function getMgr(){
  db.query("SELECT * FROM employee WHERE is_manager=1", function(err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        message: "Who will their manager be?",
        name: "addEmployeeMgr",
        choices: function(){
          const choiceArrayMgrs = []
          for (let i = 0; i<res.length-1; i++) {
              choiceArrayMgrs.push(`${res[i].id} | ${res[i].first_name} ${res[i].last_name}`);
          }
          return choiceArrayMgrs
        }
      }
    ]).then(function(mgrQ) {
      const idArr = []
      db.query("SELECT id FROM employee", function(err, ans) {
        for (let i = 0; i < ans.length; i++) {
        idArr.push(ans[i].id)
        }
        const newest = idArr[idArr.length-1];
        const mgr = parseInt(mgrQ.addEmployeeMgr.slice(0, 5));
        if (newest === mgr) {
          console.log(`Looks like you have the same id as the employee and the manager.  Please try again.`)
          getMgr();
        } else {
          addMgr(newest, mgr);
        }
      });
    })
  })
}
// Function that physically adds the manager_id attribute into the employee entry, where appropraite
// function addMgr(manager, employee){
// }
// Function to view all departments
function viewDept(){
  db.query("SELECT * FROM department", function(err,res){
    if (err) throw err;
    const deptArr = []
      for (var i = 0; i < res.length; i++) {
        deptArr.push(res[i])
  });
    console.table(res);
    firstQ();
}
// Function to view all roles
function viewRole(){
  db.query("SELECT * FROM role", function(err, res){
    if (err) throw err;
      const roleArr = []
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i])      
      }
      console.table(roleArr);
      firstQ();
    });
}   
  })
}
// Function to view all employees
function viewEmployee() {
    db.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      const empArr = []
      for (var i = 0; i < res.length; i++) {
        empArr.push(res[i]);
      }
      console.table(empArr);
      firstQ();
    });
}   
// Function to select which employee whose role we will be modifying
function modifyRoleEmplSel() {
  db.query("SELECT id, first_name, last_name FROM employee", function(err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
      type: "list",
      message: "Which employee will you be changing?",
      name: "modifyRoleChangedE",
      choices: function(){
        const choiceArrayEmpl = []
        for (let i = 0; i<res.length; i++) {
            choiceArrayEmpl.push(`${res[i].id} | ${res[i].first_name} ${res[i].last_name}`);
        }
        return choiceArrayEmpl
      }
      },
    ]).then(function(empl){
      const changingEmpl = parseInt(empl.modifyRoleChangedE.slice(0,5));
      modifyRoleRoleSel(changingEmpl)
    })
  })
}
// Function to select which role we will be changing the employee to
function modifyRoleRoleSel(empl) {
  const employee = empl
  db.query("SELECT id, title FROM role", function (err, res) {
    inquirer.prompt([
      {
      type: "list",
      message: "And what will be their new role be?",
      name: "modifyRoleChangedR",
      choices: function(){
        const choiceArrayRole = []
        for (let i = 0; i<res.length; i++) {
            choiceArrayRole.push(`${res[i].id} | ${res[i].title}`);
        }
        return choiceArrayRole
      }
      },
    ]).then(function(role) {
      const newRole = parseInt(role.modifyRoleChangedR.slice(0,5));
      const changingEmpl = role.employee
      let query = db.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRole, employee], function(err, res){
        if (err) {
        } else {
          console.log("All set!")
          firstQ();
        }
      })
    })
  })
}
// Function to select which employee whose manager we will be modifying








// Function to select and assign the correct manager to the aforementioned employee







// Function that appears at the end of each operation, to redirect to the beginning prompt if the user want to perform another action









exports.firstQ = firstQ