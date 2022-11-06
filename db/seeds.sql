INSERT INTO department (id, name)
VALUES (001, 'Frontend Developer'),
        (002, 'Backend Developer'),
        (003, 'Design'),
        (004, 'Sales'),
        (005, 'Databases'),
        (006, 'Hero');

INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'HTML', 85000, 001),
        (11, 'Javascript', 95000, 002),
        (12, 'CSS', 80000, 003),
        (13, 'Salesperson', 90000, 004),
        (14, 'MySQL', 72000, 005),
        (15, 'BeingAwesome!', 75000, 006);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (100, 'Brandon', 'Knight', 11, null),
        (200, 'Tony', 'Stark', 11, 100),
        (300, 'Steven', 'Rogers', 12, null),
        (400, 'Peter', 'Parker', 12, 200),
        (500, 'Bruce', 'Banner', 13, 300),
        (600, 'James', 'Howlett', 13, null),
        (700, 'Wade', 'Wilson', 14, 600),
        (800, 'Steven', 'Strange', 15, 400);
   
  
  