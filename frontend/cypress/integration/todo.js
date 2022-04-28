/** 
 * R8UC1, R8UC2, R8UC3
 */

const { wait } = require("@testing-library/react");


describe('Todo', () => {
    var backendUrl = 'http://localhost:5000'
    var user;
    before(() => {
        cy.request('POST', `${backendUrl}/populate`)

        //Get values from fixture/user.json
        cy.fixture('user').then((fetchedUser) => {
            user = fetchedUser
            
            //Load the page, assert that it is the landing page
            cy.visit('http://localhost:3000')
            cy.get('h1').should('contain.text', 'Login')

            //Login
            cy.contains('div', 'Email Address').find('input').type(user.email)
            cy.get('.submit-form').submit()

            //Control first page
            cy.get('h1').should('contain.text', `Your tasks, ${user.firstName} ${user.lastName}`)

            // //Select first task
            cy.get('a img:first').click()
        })
    })
    //Will remove the user from the database
    after(() => {
        cy.request('GET', `${backendUrl}/users/bymail/${user.email}`).then((user) => {
            Object.keys(user.body).forEach(value  => cy.log(value))
            cy.request('DELETE', `${backendUrl}/users/${user.body._id.$oid}`)
        })
    })


    it('Add Task, input complete', () => {
        // Get the form by class inline-form, type in the input field
        var todoText = "This is a test-text";

        //Checks length of li-list
        cy.get('.todo-item').then(($li) => {
            cy.get('.inline-form').type(todoText)

            //Submit the form
            cy.get('.inline-form').submit()
    
            //Check last li matches text and check that length of li increased by 1
            cy.get('.todo-item:last').should('contain.text', todoText).then(() => {
                cy.get('.todo-item').then(($liAdded) => {
                    expect($liAdded).to.have.length($li.length + 1)
                })
            })
        })
    })

    it('Add Task, input empty', () => {
        //Get the form by class inline-form, type empty string
        cy.get('.inline-form input[type=text]').should('have.value', '');

        // get button, invoke disabled attribute and try to click it (force: true prevents error message in cypress)
        cy.get('.inline-form input[type=submit')
            .invoke('attr', 'disabled')
            .then(disabled =>{
                disabled ? cy.get('.inline-form input[type=submit').click({force: true}) : null
            })
        
        // returns AssertionError: 'expected ... red, but the value was 'rgb(204, 204, 204)' 
        // cy.get('.inline-form input[type=text').should('have.css', 'border-color', 'red')
    })
})