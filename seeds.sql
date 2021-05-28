USE employee_DB;

-- departments
INSERT INTO department (name)
VALUES ('Production'),
('Quality Control'),
('Management');

-- roles for each department
INSERT INTO role (id, title, salary, department_id)
VALUES ('Construction', 55000.00, 1),
('Production', 35000.00, 1),
('CNC Line', 25000.00, 2),
('Shipping', 37000.00, 2),
('Quality Control', 50000.00, 3),
('Engineer', 63000.00, 3),
('Manager', 75000.00, 1),
('Manager', 75000.00, 2),
('Manager', 75000.00, 3);

-- employees in each department and role
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Martinez', 7, NULL), -- dept 1 manager
('Jessica', 'Martinez', 8, NULL), -- dept 2 manager
('Ernesto', 'Martinez', 9, NULL), -- dept 3 manager
('Andy', 'Torres', 1, 1), -- another employee
('Jenny', 'Martinez', 2, 1), -- another employee
('Gisella', 'Corcuera', 3, 2), -- another employee
('Marvin', 'Gomez', 4, 2), -- another employee
('Ruth', 'Diaz', 5, 3), -- another employee
('Juan', "Rosas", 6, 3); -- another employee