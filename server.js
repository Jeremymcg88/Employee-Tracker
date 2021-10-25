// Required dependecies 
const { prompt } = require('inquirer');
// const chalkAnimation = require('chalk-animation');
const con = require('./configs/connection');
const Database = require('./db/index');
const db = new Database ();



function initPrompt () {
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

        db.viewManagers()
        .then(([row]) => {
            let man = rows;
            const mans = man.map (({ id, first_name, last_name }) =>
            ({
                name: `${first_name}, ${last_name}`,
                value: id
            }));
            manArr = mans;
        })
            .then(() => {
                if (answers.employees === "Exit") {
                    return con.end();
                } else {
                    // iterates through choices submitted and calls the approriate method
                    switch (answers.employees) {
                        case 'View All Employees':
                            return db.viewAllEmployees()
                            .then (([rows]) => {
                                console.table(rows)
                                initPrompt();
                            });
                            case 'View All Employees by Department':
                                return db.viewAllEmployeesByDepartment()
                                .then (([rows]) => {
                                    console.table(rows);
                                    initPrompt();
                                });
                                case 'View All Roles':
                                    return db.viewRoles()
                                    .then(([rows]) => {
                                        console.table(rows);
                                        initPrompt;
                                    });
                                    case 'View All Managers':
                                        return db.viewManagers()
                                        .then (([rows]) => {
                                            console.table(rows);
                                            initPrompt;
                                        });
                                        case 'Add Employee':
                                            return db.addEmployee(roleArray, manArr).then(([res]) => {
                                                console.log('Succesfully added employee!');
                                                initPrompt();
                                            });
                                            case 'More Employee Options':
                                                switch (answers.employeeOpts) {
                                                    case 'Remove Employee':
                                                        return db.deleteEmployee(empArray).then((res) => {
                                                            console.log("Succesfully removed employee!");
                                                            initPrompt();
                                                        });
                                                        case 'Update Employee Manager':
                                                            return db.updateEmployeeMan(empArray, manArr).then((res) => {
                                                                console.log("Succesffuly updated employee's manager!");
                                                                initPrompt();

                                                            });
                                                };
                                                break;
                                                case 'Department Options':
                                                    switch (answers.deptOpts) {
                                                        case 'Add Department':
                                                            return db.addNewDepartment().then(([res]) => {
                                                                console.log("Succesfully deleted department!");
                                                                initPrompt();
                                                            });
                                                    }
                                                    break;
                                                    case 'Role Options':
                                                        switch (answers.roleOpts) {
                                                            case 'Add Role':
                                                                return db.addRoles(rolArr).then ((res) => {
                                                                    console.log('Succesfully added role!');
                                                                    initPrompt();
                                                                });
                                                                case 'Remove Role':
                                                                    return db.deleteRoles(roleArray).then((res) => {
                                                                        console.log('Succesfully deleted role!');
                                                                        initPrompt();
                                                                    });
                                                        }
                                                        break;


                    };
                };
            })
            .catch(err => {
                console.log(err);
            });

    });


};
initPrompt();


