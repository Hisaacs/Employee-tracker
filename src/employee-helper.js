// importing connection
const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  //this section views all the employees
  viewAllEmployees() {
    return this.connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(e_mng.first_name, ' ' , e_mng.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON role.id = employee.role_id 
            LEFT JOIN department ON department.id = role.department_id
            LEFT JOIN employee AS e_mng ON e_mng.id = employee.manager_id`
    );
  }


  // this section views employees by their selected manager
  viewAllEmployeesByManager(employeeId) {
    return this.connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee
            LEFT JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON department.id = role.department_id
            WHERE manager_id = ${employeeId}`
    );
  }

  // this section adds a new employee
  createEmployee(employee) {
    return this.connection.query(`INSERT INTO employee SET ?`, employee);
  }

  // update selected employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      `UPDATE employee SET manager_id = ${managerId} 
            WHERE id = ${employeeId}`
    );
  }

  // this section removes the selected employee
  removeEmployee(employeeId) {
    return this.connection.query(
      `DELETE FROM employee
            WHERE id = ${employeeId}`
    );
  }
}

  module.exports = new DB(connection);