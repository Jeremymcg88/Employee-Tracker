// Required dependecies 
const { prompt } = require('inquirer');
const chalkAnimation = require('chalk-animation');
const conf = require('./configs/connection');
const Database = require('./db/index');
const { title } = require('process');
const db = new Database ();



function initProgram () {
    prompt ([
        {
            type: "list",
            name: "employees",
            message: "Please use the arrow keys to select",
            choices: 
            [
                "View All Employees",
                "View All Employees By Department",
                "View All Departments",
                "View All Roles",
                "View All Managers",
                "Add Employee",
                "More Employee Options",
                "Department Options",
                "Role Options",
                "Exit"
            ]
        },
        // Sub categories
        {
            type: "list",
            name: "Employee Options",
            message: "Please select from the list of options.",
            choices: ["Add Role", "Remove Role",],
            when: (answers) => answers.employees === "Role Options"
        },
        {
            type: "list",
            name: "Dept Options",
            message: "Please select from the list of options.",
            choices: ["Add Department", "Remove Department"],
            when: (answers) => answers.employees === "Department Options"
        },
        {
            type: "list",
            name: "Role Options",
            message: "Please select from the list of options.",
            choices: ["Add Role", "Remove Role",],
            when: (answers) => answers.employees === "Role Options"
        },
    ])
    .then((answers) => {
        // Arrays that store table data once table information is invoked
        let deptArray = [];
        let roleArray = [];
        let manArray = [];
        let empArray = [];
        // retreived information from db table arrays
        db.viewDepartments()
        .then(([rows]) => {
            let dept = rows;
            const depts = dept.map(({ id, name}) => 
            ({
                name: name,
                value: id

            }));
            deptArray = depts;
        });
        
        db.viewRoles()
        .then(([rows]) => {
            let role = rows;
            const roles = role.map(({ id, title }) => 
            ({
                name: title,
                value: id
            }));
            roleArray = roles;
        });

        db.viewAllEmployees()
        .then (([rows]) => {
            let emp = rows;
            const emps = emp.map(({ id, first_name, last_name}) =>
            ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            empArray = emps;
        });

        
    });


}


