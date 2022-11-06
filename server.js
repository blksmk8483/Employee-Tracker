const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// -------------   CONNECTION TO EMPLOYEE DATABASE   -------------
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // TODO: Add MySQL password here
        password: '1Drummer@1',
        database: 'employee_db'
    });

db.connect(err => {
    if (err) throw err;
    console.log(`
    -------------   Connected to the EMPLOYEES DATABASE!   -------------
    `)
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Exit"
            ]
        })  // I think I should make this a switch statement....
        .then(function (answer) {
            if (answer.action === 'View all departments') {
                viewDepartments();
            } else if (answer.action === 'View all roles') {
                viewRoles();
            } else if (answer.action === 'View all employees') {
                viewEmployees();
            } else if (answer.action === 'Add a department') {
                addDepartment();
            } else if (answer.action === 'Add a role') {
                addRole();
            } else if (answer.action === 'Add an employee') {
                addEmployee();
            } else if (answer.action === 'Update employee role') {
                updateRole();
            }
            else if (answer.action === 'Exit') {
                db.exit();
            }
        });
};


// -------------   VIEW ALL DEPARTMENTS   -------------
function viewDepartments() {
    const sql = "SELECT * FROM department";
    db.query(sql, async (err, res) => {
        console.log(`
        -------------   DEPARTMENTS:   ------------- 
        `);
        console.table(res);
        start();
    });
};

// -------------   VIEW ALL ROLES   -------------
function viewRoles() {
    const sql = "SELECT * FROM role";
    db.query(sql, function (err, res) {
        console.log(`
        -------------   ROLES:   ------------- 
        `);
        console.table(res);
        start();
    });
};

// -------------   VIEW ALL EMPLOYEES   -------------
function viewEmployees() {
    const sql = "SELECT * FROM employee";
    db.query(sql, function (err, res) {
        console.log(`
        -------------   EMPLOYEES:   ------------- 
        `);
        console.table(res);
        start();
    });
};

// -------------   ADD A DEPARTMENT   -------------
function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Enter new department name."
        })
        .then(function (answer) {
            const sql = "INSERT INTO department (name) VALUES ( ? )";
            db.query(sql, answer.department, function (err, res) {
                console.log(`
            -------------   Your new department ${answer.department} has been added.   -------------
            `);
                // console.table(viewDepartments(res));
            })
            start();
        });
};

// -------------   ADD A ROLE   -------------
function addRole() {
    db.query('SELECT * FROM department', function (err, res) {
        if (err) throw (err);
        inquirer
            .prompt([{
                name: "title",
                type: "input",
                message: "What is the title of the new role?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?",
            },
            {
                name: "departmentName",
                type: "list",
                message: "Which department does this role fall under?",
                choices: function () {
                    var choicesArray = [];
                    res.forEach(res => {
                        choicesArray.push(
                            res.name
                        );
                    })
                    return choicesArray;
                }
            }
            ])
            .then(function (answer) {
                const department = answer.departmentName;
                db.query('SELECT * FROM DEPARTMENT', function (err, res) {
                    if (err) throw (err);
                    let filteredDept = res.filter(function (res) {
                        return res.name == department;
                    });
                    const id = filteredDept[0].id;
                    const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
                    const newRole = [answer.title, parseInt(answer.salary), id]
                    db.query(sql, newRole, function (err, res) {
                            console.log(`
            -------------   You added the role: ${newRole[0]}.   -------------
            `);
            console.table(newRole);
                        })
                    start();
                });
            });
    });
};

// -------------   ADD AN EMPLOYEE   -------------
function addEmployee() {
    db.query('SELECT * FROM role', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          }, 
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleName",
            type: "list",
            message: "What role does the employee have?",
            choices: function() {
             rolesArray = [];
                result.forEach(result => {
                    rolesArray.push(
                        result.title
                    );
                })
                return rolesArray;
              }
          }
          ]) 
        }

        .then(function(answer) {
        console.log(answer);
        })

)}

        
// -------------   UPDATE AN EMPLOYEE   -------------

// -------------   EXIT   -------------



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});