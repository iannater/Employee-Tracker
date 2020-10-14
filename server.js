// Import our dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
// Create/configure our MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "BriggoK2",
    database: "employee_trackerdb"
});

connection.connect(err => {
    if (err) {
        throw err;
    }
    mainPrompt();
});

function mainPrompt() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            {
                name: "Add department",
                value: "ADD_DEPT"
            },
            {
                name: "Add role",
                value: "ADD_ROLE"
            },
            {
                name: "Add employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "View departments",
                value: "VIEW_ALL_DEPT"
            },
            {
                name: "View roles",
                value: "VIEW_ALL_ROLES"
            },
            {
                name: "View employees",
                value: "VIEW_ALL_EMPLOYEES"
            },
            {
                name: "Update employee roles",
                value: "UPDATE_EMPLOYEE_ROLES"
            },
        ]
    }).then(onMainPromptAnswer);
}

function onMainPromptAnswer({ action }) {
    console.log(action)
    switch (action) {
        case "ADD_DEPT":
            addDept();
            break;

        case "ADD_ROLE":
            addRole();
            break;

        case "ADD_EMPLOYEE":
            addEmployee();
            break;

        case "VIEW_ALL_DEPT":
            viewAllDept();
            break;
        case "VIEW_ALL_ROLES":
            viewAllRoles();
            break;

        case "VIEW_ALL_EMPLOYEES":
            viewAllEmployees();
            break;

        case "UPDATE_EMPLOYEE_ROLES":
            updateEmployeeRoles();
            break;

        case "Exit":
        default:
            console.log("Goodbye!");
            connection.end();
    }
}

async function addDept() {
    const depart = await inquirer.prompt([{
        name: "name",
        message: "What is the name of the department"
    }])

    connection.query("INSERT INTO department SET ?", depart)
    mainPrompt();
}

function addRole() {
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the title for the role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for the role?"
        },
        {
            name: "department_id",
            type: "number",
            message: "What is the department ID?"
        }])
        .then(({ title, salary, department_id }) => {
            let newRole = {
                title: title,
                salary: salary,
                department_id: department_id
            }
            const query = "INSERT INTO role SET ?";
            connection.query(query, newRole, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log("Your role has been added")

                mainPrompt();
            });
        })
};


function addEmployee() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "role_id",
            type: "number",
            message: "What is the employees role id?"
        },
        {
            name: "manager_id",
            type: "number",
            message: "What is the employees role id?"
        }])
        .then(({first_name, last_name, role_id, manager_id }) => {
            let newEmployee = {
                first_name: first_name,
                last_name: last_name,
                role_id: role_id,
                manager_id: manager_id
            }
            const query = "INSERT INTO employee SET ?";
            connection.query(query, newEmployee, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log("Your employee has been added")

                mainPrompt();
            });
        })
};

function viewAllDept(){
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Data received from department table');
        console.table(res);
        mainPrompt();
    });
}

function viewAllRoles(){
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Data received from roles table');
        console.table(res);
        mainPrompt();
    });
}

function viewAllEmployees(){
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Data received from employee table');
        console.table(res);
        mainPrompt();
    });
}
// I made this function so that the user could see the current role ids and manager ids for all employees when updating a record.
function showAllEmployees(){
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Data received from employee table');
        console.table(res);
    });
}

function updateEmployeeRoles(){
    showAllEmployees();
    inquirer.prompt([{
        name: "id",
        type: "number",
        message: "What is the employee id of the employee you would like to update?"
    },
   {
        name: "role_id",
        type: "number",
        message: "What is the role id you would like to change the employee to?"
    },
    ]).then(({id, role_id}) => {
    
        connection.query("UPDATE employee SET ? WHERE ? ", [{role_id: role_id},{id: id} ], (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Your employee has been updated")

            mainPrompt();
        });
    })};