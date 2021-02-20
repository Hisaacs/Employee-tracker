// importing connection
const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // this section views all the roles
  viewAllRoles() {
    return this.connection.query(
      `SELECT role.id, role.title, role.salary, department.name 
            FROM role 
            LEFT JOIN department ON role.department_id = department.id`
    );
  }

  // this section adds new role
  createRole(role) {
    return this.connection.query(`INSERT INTO role SET ?`, role);
  }

  // this section updates the selected employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      `UPDATE employee SET role_id = ${roleId} 
            WHERE id = ${employeeId}`
    );
  }
//-----------------------------------------------------------------------
  // this section updates the selected employee's department
  updateEmployeeDepartment(employeeId, roleId) {
    return this.connection.query(
      `UPDATE employee SET department_id = ${roleId} 
            WHERE id = ${employeeId}`
    );
  }

  //-----------------------------------------------------------------------
  // this section removes the selected role
  removeRole(roleId) {
    return this.connection.query(
      `DELETE FROM role
            WHERE id = ${roleId}`
    );
  }
}

module.exports = new DB(connection);
