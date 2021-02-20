// importing npm inquirer dependencies
const inquirer = require("inquirer");
const { prompt } = require("inquirer");

// importing helper files from src folder
const dbRole = require("./src/role-helper");
const dbEmployee = require("./src/employee-helper");
const dbDepartment = require("./src/department-helper");

//team array
const team = [];

startPrompts();

// this section is prompting the user
async function startPrompts() {
  const { choice } = await prompt([
    {
      name: "choice",
      type: "list",
      message: "What would you like do?",
      choices: [
        new inquirer.Separator(
          "|-----------------Adding----------------------------|"
        ),
        {
          name: "Adding Department",
          value: "1",
        },
        {
          name: "Adding Roles",
          value: "2",
        },
        {
          name: "Adding Employee",
          value: "3",
        },
        new inquirer.Separator(
          "|-----------------Viewing---------------------------|"
        ),
        {
          name: "Viewing All Departments",
          value: "4",
        },
        {
          name: "Viewing All Employees",
          value: "5",
        },
        {
          name: "Viewing All Roles",
          value: "6",
        },
        {
          name: "Viewing All Employees By Department",
          value: "7",
        },
        {
          name: "Viewing All Employees By Manager",
          value: "8",
        },
        new inquirer.Separator(
          "|-----------------Updating--------------------------|"
        ),
        {
          name: "Updating an Employee Role",
          value: "9",
        },
        {
          name: "Updating an Employee's Manager",
          value: "10",
        },
        {
          name: "Updating an Employee's Department",
          value: "15",
        },
        new inquirer.Separator(
          "|-----------------Removing--------------------------|"
        ),
        {
          name: "Removing Department",
          value: "11",
        },
        {
          name: "Removing Employee",
          value: "12",
        },
        {
          name: "Removing Roles",
          value: "13",
        },
        new inquirer.Separator(
          "|-----------------Exciting--------------------------|"
        ),
        {
          name: "Exit",
          value: "14",
        },
      ],
    },
  ]);
  switch (choice) {
    case "1":
      return addDepartment();
    case "2":
      return addRole();
    case "3":
      return addEmployee();
    case "4":
      return viewDepartments();
    case "5":
      return viewEmployees();
    case "6":
      return viewRoles();
    case "7":
      return viewEmployeesByDepartment();
    case "8":
      return viewEmployeesByManager();
    case "9":
      return updateEmployeeRole();
    case "10":
      return updateEmployeeManager();
    case "11":
      return removeDepartment();
    case "12":
      return removeEmployee();
    case "13":
      return removeRole();
    case "15":
      return updateEmployeeDepartment();
    default:
      return quit();
  }
}

//-----------------------------------Adding---------------------------------------------------------

// this function to add new department
async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?",
      validate: validate,
    },
  ]);

  await dbDepartment.createDepartment(department);

  console.log(`Added ${department.name} to the database`);

  startPrompts();
}

// this function to to add new role
async function addRole() {
  const departments = await dbDepartment.viewAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?",
      validate: validate,
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
      validate: validate,
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      validate: validate,
      choices: departmentChoices,
    },
  ]);

  await dbRole.createRole(role);

  console.log(`Added ${role.title} to the database`);

  startPrompts();
}

// this function adds a new employee
async function addEmployee() {
  const roles = await dbRole.viewAllRoles();
  const employees = await dbEmployee.viewAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
      validate: validate,
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
      validate: validate,
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    validate: validate,
    choices: roleChoices,
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  managerChoices.unshift({
    name: "None",
    value: null,
  });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    validate: validate,
    choices: managerChoices,
  });
  
  employee.manager_id = managerId;

  await dbEmployee.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  startPrompts();

}

//-----------------------------------Viewing---------------------------------------------------------

// this function to view all the departments
async function viewDepartments() {
  const departments = await dbDepartment.viewAllDepartments();
  console.log("\n");
  console.table(departments);

  startPrompts();
}

// this function view all employees
async function viewEmployees() {
  const employees = await dbEmployee.viewAllEmployees();

  console.log("\n");
  console.table(employees);

  startPrompts();
}

// this function to view employees by department
async function viewEmployeesByDepartment() {
  const departments = await dbDepartment.viewAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      validate: validate,
      choices: departmentChoices,
    },
  ]);

  const employees = await dbDepartment.viewAllEmployeesByDepartment(
    departmentId
  );
  console.log("\n");
  console.table(employees);


  startPrompts();
}

// function to view all the roles
async function viewRoles() {
  const roles = await dbRole.viewAllRoles();
  console.log("\n");
  console.table(roles);
  

  startPrompts();
}

// this function to view all the employees managers
async function viewEmployeesByManager() {
  const employees = await dbEmployee.viewAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which manager would you like to see employees for?",
      validate: validate,
      choices: employeeChoices,
    },
  ]);

  const managers = await dbEmployee.viewAllEmployeesByManager(employeeId);

  console.log("\n");
  console.table(managers);


  startPrompts();
}

//-----------------------------------Updating---------------------------------------------------------

// this function is to update selected employee's role
async function updateEmployeeRole() {
  const employees = await dbEmployee.viewAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      validate: validate,
      choices: employeeChoices,
    },
  ]);

  const roles = await dbRole.viewAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      validate: validate,
      choices: roleChoices,
    },
  ]);

  await dbRole.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  startPrompts();
}

//-------------------------------------------------------------------------------

// this function is to update selected employee's department
async function updateEmployeeDepartment() {
  const employees = await dbEmployee.viewAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's department do you want to update?",
      validate: validate,
      choices: employeeChoices,
    },
  ]);

  const department = await dbDepartment.viewAllDepartments();

  const roleChoices = department.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department do you want to assign the selected employee?",
      validate: validate,
      choices: roleChoices,
    },
  ]);

  await dbRole.updateEmployeeRole(employeeId, departmentId);

  console.log("Updated employee's department");

  startPrompts();
}

//------------------------------------------------------------------------------

// this function is to update selected employee's manager
async function updateEmployeeManager() {
  const employees = await dbEmployee.viewAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));


  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's manager do you want to update?",
      validate: validate,
      choices: employeeChoices,
    },
  ]);

  const managers = await dbEmployee.viewAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  managerChoices.unshift({
    name: "None",
    value: null,
  });
  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which manager do you want to assign the selected employee?",
      validate: validate,
      choices: managerChoices,
    },
  ]);

  await dbEmployee.updateEmployeeManager(employeeId, managerId);

  console.log("Updated employee's manager!");

  startPrompts();
}

//-----------------------------------Removing---------------------------------------------------------

// this function to remove selected department
async function removeDepartment() {
  const departments = await dbDepartment.viewAllDepartments();

  const departmentsChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to delete?",
      validate: validate,
      choices: departmentsChoices,
    },
  ]);

  await dbDepartment.removeDepartment(departmentId);

  console.log(`Department successfully removed!`);

  startPrompts();
}

// this function removes selected employee
async function removeEmployee() {
  const employees = await dbEmployee.viewAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee would you like to delete?",
      validate: validate,
      choices: employeeChoices,
    },
  ]);

  await dbEmployee.removeEmployee(employeeId);

  console.log(`Removed employee successfully!`);

  startPrompts();
}

// this function to remove selected role
async function removeRole() {
  const roles = await dbRole.viewAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role would you like to delete?",
      validate: validate,
      choices: roleChoices,
    },
  ]);

  await dbRole.removeRole(roleId);

  console.log(`Removed role successfully!`);

  startPrompts();
}

function validate(input) {
  if (!input == "") {
    return true;
  } else {
    return "Field cannot be blank";
  }
}

const continueQuit = () => {
  inquirer
    .prompt({
      name: "continue",
      type: "confirm",
      message: `
    
    Anything Else?`,
      default: true,
    })
    .then((somethingElse) => {
      if (somethingElse.continue) {
       console.log('');
      }
    });
};

// function to quit the prompts
function quit() {
  console.log("You have now ended the application. Good-Bye!");
  process.exit();
}
