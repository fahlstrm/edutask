/** 
 * R8UC1, R8UC2, R8UC3
 */

const { wait } = require("@testing-library/react");
var frontendUrl = 'http://localhost:3000'
var backendUrl = 'http://localhost:5000'

describe('Todo test', () => {
    // BEFORE EVERY IT()-TEST, CLOSE EVENTUAL WINDOW AND LOGOUT, THEN LOGIN AND SELECT FIRST TASK 
    beforeEach(() => {
        // Create user and taks
        cy.fixture('user').then((user) => {
            cy.request({
                method: 'POST',
                url: `${backendUrl}/users/create`,
                form: true,
                body: user
            }).then((response) => {
                var uid = response.body._id.$oid

                // create one fabricated task for that user
                cy.fixture('task.json')
                    .then((task) => {
                        // add the user id to the data of the task object
                        task.userid = uid
                        cy.request({
                            method: 'POST',
                            url: `${backendUrl}/tasks/create`,
                            form: true,
                            body: task
                        }).then((task) => {
                            var tid = task
                            // Create a todo with done: true
                            cy.request({
                                method: `POST`,
                                url: `${backendUrl}/todos/create`,
                                form: true,
                                body: {
                                taskid: tid.body[0]._id.$oid,
                                description: "Checked todo"
                                },
                                headers: { 'Cache-Control': 'no-cache' }
                            }).then((todo) => {
                            cy.request({
                                method: 'PUT',
                                url: `${backendUrl}/todos/byid/${todo.body._id.$oid}`,
                                body: {'data': `{'$set': {'done': true}}`},
                                form: true
                            }).then(() => {
                                // Load page, assert it is landing page
                                cy.visit(frontendUrl)

                                // Login
                                cy.contains('div', 'Email Address').find('input').type(user.email)
                                cy.get('.submit-form').submit()

                                // //Select first task
                                cy.get('a img:first').click()
                            })  
                        })
                    })
                })
            })
        })
    })
 
    it('Add Task, input complete', () => {
        //Assure input field is empty before test runs, else break
        cy.get('.inline-form input[type=text]').should('have.value', '');

        // Get the form by class inline-form, type in the input field
        var todoText = "This is a test-text";

        //Checks length of li-list ($li is array of all li elements)
        cy.get('.todo-item').then(($li) => {
            // type todoText
            cy.get('.inline-form').type(todoText)

            //Submit form
            cy.get('.inline-form').submit()
    
            //Check last li matches text and check that length of li array ($liAdded) increased by 1
            cy.get('.todo-item:last').should('contain.text', todoText).then(() => {
                cy.get('.todo-item').then(($liAdded) => {
                    expect($liAdded).to.have.length($li.length + 1)
                })
            })
        })
    })

    it('Add Task, input empty should not be added to list, alternative scenario: border should be red', () => {
         // Get the form by class inline-form, type empty string
         cy.get('.inline-form input[type=text]').should('have.value', '');
 
         /**
          * Checks length of li-list, then try to add. Length of li should be same afterwards
          * As per alternative scenarios border should be red
          */
         cy.get('.todo-item').then(($li) => {
             // submit (force: true prevents error message in cypress)
             cy.get('.inline-form input[type=submit').click({force: true})
             // get array of li
             cy.get('.todo-item').then(($liAfterClick) => {
                 // check li array is same length as before
                 expect($liAfterClick).to.have.length($li.length)
                 // ASSERTIONERROR: check border is red
                 cy.get('.inline-form input[type=text').should('have.css', 'border-color', 'red')
             })
         })
     })

    it('Set item to done', () => {
        // ASSERTIONERROR: Expect class to go from 'checker unchecked' to 'checker checked'
        cy.get('.checker:first').click().then(() => {
            cy.get('.checker:first').should('have.class', 'checker checked')
        })
    })

    it('Uncheck item', () => {
        // Click to remove strike trough
        cy.get('.checker').eq(1).click().then(() => {
            // assert checker is unchecked
            cy.get('.checker').eq(1).should('have.class', 'checker unchecked')
        })
    })
 
    it('Delete todo', () => {
        /**
         * Checks length of li-list, then try to delete.
         * Length of li should be one less afterwards
         */

        // ASSERTIONERROR: get all li, click to delete, then compare old and new li array
        cy.get('.todo-item').then(($liArray) => {
            cy.get('.todo-item').eq(0).find('.remover').click().then(() => {
                cy.get('.todo-item').then(($shorterLiArray) => {
                    expect($shorterLiArray).to.have.length($liArray.length - 1)
                })
            })
        })
    })
 
    afterEach(() => {
        // Delete user before test execution if user exists within test database
        cy.fixture('user').then((userdata) => {
            cy.request('GET', `${backendUrl}/users/bymail/${userdata.email}`).then((user) => {
                if (user) {
                    cy.request('DELETE', `${backendUrl}/users/${user.body._id.$oid}`)
                }
            })
        })
    })
})
 
 
 // it('Add several tasks, input complete', () => {
 //     // Amount of test/adds to do
 //     var i = 1;
 //     var tests = 3;
 //     // Get the form by class inline-form, type in the input field
 //     var todoText = "This is a test-text";
 
 //     while(i < tests) {
 //         // Assure input field is empty before test runs, else break
 //         cy.get('.inline-form input[type=text]').should('have.value', '');
 //         // Checks length of li-list
 //         cy.get('.todo-item').then(($li) => {
 //             cy.get('.inline-form').type(todoText)
 
 //             // Submit the form
 //             cy.get('.inline-form').submit()
 
 //             // Check last li matches text and check that length of li increased by 1
 //             cy.get('.todo-item:last').should('contain.text', todoText).then(() => {
 //                 cy.get('.todo-item').then(($liAdded) => {
 //                     expect($liAdded).to.have.length($li.length + 1)
 //                 })
 //             })
 //         })
 //         i++
 //     }
 // })
