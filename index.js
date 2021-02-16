//importing Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connection Properites
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "is@h@m123",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});


const start = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select an option: ",
      name: "option",
      choices: ["Add", "View", "Update", "Delete", "Exit"],
    })
    .then((answer) => {
      const option = answer.option;
      switch (option) {
        case "Add":
          add();
          break;
        case "View":
          view();
          break;
        case "Update":
          update();
          break;
        case "Delete":
          deleteRecord();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

// select to add
const add = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select what you would like to add: ",
      name: "add",
      choices: ["Department", "Role", "Employee", "Done"],
    })
    .then((answer) => {
      const option = answer.add;
      switch (option) {
        case "Department":
          addDepartment(); // adding department
          break;
        case "Role":
          addRole(); // TODO
          break;
        case "Employee":
          addEmployee(); // TODO
          break;
        case "Done":
          start();
          break;
      }
    });
};

// view

const view = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select what you would like to view: ",
      choices: [
        "Departmens",
        "Roles",
        "Employees",
        "Employees By Manager",
        "Budget",
        "Done",
      ],
      name: "view",
    })
    .then((answer) => {
      const option = answer.view;
      switch (option) {
        case "Departments":
          viewDepartment(); // TODO
          break;
        case "Roles":
          viewRole(); // TODO
          break;
        case "Employees":
          viewEmployee(); // TODO
          break;
        case "Employees By Manager":
          viewEmployeesByManager(); // TODO
          break;
        case "Budget":
          viewBudget(); // TODO
          break;
        case "Done":
          start();
          break;
      }
    });
};

const update = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select your employee's ROLE or MANAGER to update: ",
      choices: ["Role", "Manager", "Done"],
      name: "update",
    })
    .then((answer) => {
      const option = answer.update;
      switch (option) {
        case "Role":
          updateRole(); // TODO
          break;
        case "Manager":
          updateManager(); // TODO
          break;
        case "Done":
          start();
          break;
      }
    });
};

const deleteRecord = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select what you would like to delete: ",
      name: "delete",
      choices: ["Department", "Role", "Employee", "Done"],
    })
    .then((answer) => {
      const option = answer.delete;
      switch (option) {
        case "Department":
          deleteDepartment(); // TODO
          break;
        case "Role":
          deleteRole(); // TODO
          break;
        case "Employee":
          deleteEmployee(); // TODO
          break;
        case "Done":
          start();
          break;
      }
    });
};
// Add Department

function addDepartment() {
  inquirer
    .prompt({
      // Prompting user for name of department
      name: "deptName",
      type: "input",
      message: "Department Name: ",
    })
    .then((answer) => {
      // adding department to the table
      connection.query(
        `INSERT INTO department (name)VALUES ("${answer.deptName}");`,
        (err, res) => {
          if (err) throw err;
          console.log("\n DEPARTMENT ADDED...\n ");
          start();
        }
      );
    });
}

// Adding a new role to the database

function addRole() {
  
  connection.query('SELECT * FROM department', function(err, res) {
      if (err) throw err;
      console.log({res});
     
      inquirer 
      .prompt([
          {
              name: 'new_role',
              type: 'input', 
              message: "What new role would you like to add?"
          },
          {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of this role? (Enter a number)'
          },
          {
              name: 'department',
              type: 'list',
              choices: res.map((department) => {
                return {
                  name: department.name,
                  value: department.id,
                }
              })
          }
      ]).then(function (answer) {
            
          connection.query(
              'INSERT INTO role SET ?',
              {
                  title: answer.new_role,
                  salary: answer.salary,
                  department_id: answer.department
              },
              function (err, res) {
                  if(err)throw err;
                  console.log("\n ROLE ADDED...\n ");
                  start();
              })
      })
  })
};