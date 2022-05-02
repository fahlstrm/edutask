/** 
 * R8UC1, R8UC2, R8UC3
 */

const { wait } = require("@testing-library/react");
var frontendUrl = 'http://localhost:3000'
var backendUrl = 'http://localhost:5000'
var user; 


describe('R8UC1, R8UC2, R8UC3', () => {
    // BEFORE EVERY IT()-TEST, CLOSE EVENTUAL WINDOW AND LOGOUT, THEN LOGIN AND SELECT FIRST TASK 
    beforeEach(() => {
        // if a test not resetted because of a failure, check for close-btn and log out
        cy.get('body').then($body => {
            if ($body.find('.close-btn:first').length > 0) {
                // close window
                cy.get('.close-btn:first').click()
                .then(() => {
                    // click login arrow button
                    cy.get('a.icon-button:first').click()
                })
                .then(() => {
                    // log out
                    cy.get('span.icon-button:first').click()
                })
            }
        })

        // Get values from fixture/user.json
        cy.fixture('user').then((fetchedUser) => {
        user = fetchedUser

        // get user by mail
        cy.request('GET', `${backendUrl}/users/bymail/${user.email}`).then((user) => {
            // delete user by id
            cy.request('DELETE', `${backendUrl}/users/${user.body._id.$oid}`)
        })
        
        // populate db with an initial user and some tasks
        cy.request('POST', `${backendUrl}/populate`)

        // Get values from fixture/user.json
        cy.fixture('user').then((fetchedUser) => {
        user = fetchedUser
        
        // Load page, assert it is landing page
        cy.visit(frontendUrl)
        cy.get('h1').should('contain.text', 'Login')

        // Login
        cy.contains('div', 'Email Address').find('input').type(user.email)
        cy.get('.submit-form').submit()

        // Control first page
        cy.get('h1').should('contain.text', `Your tasks, ${user.firstName} ${user.lastName}`)

        // //Select first task
        cy.get('a img:first').click()

        })
    })    
    })
    
    /**
     * R8UC1
     */
    it('R8UC1: Add todo, input complete', () => {
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

    it('R8UC1: Add empty todo, input empty should not be added to list, alternative scenario: border should be red', () => {
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

    /**
     * R8UC2
     */
    it('R8UC2: Set todo to done', () => {
        // ASSERTIONERROR: Expect class to go from 'checker unchecked' to 'checker checked'
        cy.get('.checker:first').click().then(() => {
            cy.get('.checker:first').should('have.class', 'checker checked')
        })
    })

    it('R8UC2: Uncheck todo', () => {
        // Double click needed to strike through
        cy.get('.checker:first').click()
        cy.get('.checker:first').click()
        .then(() => {
            cy.wait(2000)
            cy.get('.checker:first').click()
            .then(() => {
                // assert checker is unchecked
                cy.get('.checker:first').should('have.class', 'checker unchecked')
            })
        })
    })
 
    /**
     * R8UC3
     */
    it('R8UC3: Delete todo', () => {
        /**
         * Checks length of li-list, then try to delete.
         * Length of li should be one less afterwards
         */

        // ASSERTIONERROR: get all li, click to delete, then compare old and new li array
        cy.get('.todo-item').then(($liArray) => {
            cy.get('.todo-item').eq(1).find('.remover').click().then(() => {
                cy.get('.todo-item').then(($shorterLiArray) => {
                    expect($shorterLiArray).to.have.length($liArray.length - 1)
                })
            })
        })
    })
})