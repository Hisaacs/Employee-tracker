USE employees_db;

----- Department Seeds -----

INSERT INTO department (id, name)
VALUES (1, "Stock Control");

INSERT INTO department (id, name)
VALUES (2, "Buying");


----- Role Seeds -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Demand Planner", 85000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Buyer", 90000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, Manager", 100000, 1);

----- Employees Seeds -----
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, "Gavin Leak");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mary", "White", 1, "Gavin Leak");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Craig", "Davies", 1, "Gavin Leak");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Brett", "Matthews", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Rupid", "Snapper", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Joseph", "Ross", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Gavin", "Leak", 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Jean", "Alison", 2, 4);
