USE employee_DB;

-- departments
INSERT INTO department (id, name)
VALUES (1, 'Production'),
(2, 'Quality Control'),
(3, 'Management');

-- roles for each department
INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Construction', 55000.00, 1),
(2, 'Production', 35000.00, 1),
(3, 'CNC Line', 25000.00, 2),
(4, 'Shipping', 37000.00, 2),
(5, 'Quality Control', 50000.00, 3),
(6, 'Engineer', 63000.00, 3),
(7, 'Manager', 75000.00, 1),
(8, 'Manager', 75000.00, 2),
(9, 'Manager', 75000.00, 3);

-- employees in each department and role
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Michael', 'Martinez', 7, NULL), -- dept 1 manager
(2, 'Jessica', 'Martinez', 8, NULL), -- dept 2 manager
(3, 'Ernesto', 'Martinez', 9, NULL), -- dept 3 manager
(4, 'Andy', 'Torres', 1, 1), -- another employee
(5, 'Jenny', 'Martinez', 2, 1), -- another employee
(6, 'Gisella', 'Corcuera', 3, 2), -- another employee
(7, 'Marvin', 'Gomez', 4, 2), -- another employee
(8, 'Ruth', 'Diaz', 5, 3), -- another employee
(9, 'Juan', "Rosas", 6, 3); -- another employee