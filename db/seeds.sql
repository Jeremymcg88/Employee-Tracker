USE employees;

INSERT INTO department (name)
VALUES
('Information Technology'),
('Business and Sales'),
('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager1', 200000, 1),
('Manager2', 175000, 2),
('Manager3', 170000, 3),
('Senior Salesman1', 100000, 1),
('Senior Salesman2', 95000, 1),
('Salesman1', 75000, 2),
('Salesman2', 70000, 2),
('Customer Support1', 50000, 3),
('Customer Support2', 45000, 3),
('Employee', 0, 2);

INSERT INTO employee(last_name, first_name, role_id, manager_id)
VALUES
('Ronald', 'Firbank', 1, null),
  ('Virginia', 'Woolf', 2, null),
  ('Piers', 'Gaveston', 3, null),
  ('Charles', 'LeRoi', 4, 1),
  ('Katherine', 'Mansfield', 5, 1),
  ('Dora', 'Carrington', 6, 2),
  ('Edward', 'Bellamy', 7, 2),
  ('Montague', 'Summers', 8, 3),
  ('Octavia', 'Butler', 9, 3),
  ('Unica', 'Zurn', 10, 2);

