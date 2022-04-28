/** 
 * R8UC1, R8UC2, R8UC3
 */

const { wait } = require("@testing-library/react");
var frontendUrl = 'http://localhost:3000'
var backendUrl = 'http://localhost:5000'
var user; 


// describe('R8UC1 Todo input', () => {
//     beforeEach(() => {
//         cy.request('POST', `${backendUrl}/populate`)

    //     //Get values from fixture/user.json
    //     cy.fixture('user').then((fetchedUser) => {
    //     user = fetchedUser
        
    //     //Load the page, assert that it is the landing page
    //     cy.visit(frontendUrl)
    //     cy.get('h1').should('contain.text', 'Login')

    //     //Login
    //     cy.contains('div', 'Email Address').find('input').type(user.email)
    //     cy.get('.submit-form').submit()

    //     //Control first page
    //     cy.get('h1').should('contain.text', `Your tasks, ${user.firstName} ${user.lastName}`)

    //     // //Select first task
    //     cy.get('a img:first').click()
    // })    
//     })
    
//     afterEach(() => {
            // cy.request('GET', `${backendUrl}/users/bymail/${user.email}`).then((user) => {
            //     cy.request('DELETE', `${backendUrl}/users/${user.body._id.$oid}`)
            // })
//     })


//     it('Add Task, input complete', () => {
//         //Assure input field is empty before test runs, else break
//         cy.get('.inline-form input[type=text]').should('have.value', '');

//         // Get the form by class inline-form, type in the input field
//         var todoText = "This is a test-text";

//         //Checks length of li-list
//         cy.get('.todo-item').then(($li) => {
//             cy.get('.inline-form').type(todoText)

//             //Submit the form
//             cy.get('.inline-form').submit()
    
//             //Check last li matches text and check that length of li increased by 1
//             cy.get('.todo-item:last').should('contain.text', todoText).then(() => {
//                 cy.get('.todo-item').then(($liAdded) => {
//                     expect($liAdded).to.have.length($li.length + 1)
//                 })
//             })
//         })
//     })

//     it('Add several tasks, input complete', () => {
//         // Amount of test/adds to do
//         var i = 1;
//         var tests = 2;
//         // Get the form by class inline-form, type in the input field
//         var todoText = "This is a test-text";

//         while(i < tests) {
//             //Assure input field is empty before test runs, else break
//             cy.get('.inline-form input[type=text]').should('have.value', '');
//             //Checks length of li-list
//             cy.get('.todo-item').then(($li) => {
//                 cy.get('.inline-form').type(todoText)

//                 //Submit the form
//                 cy.get('.inline-form').submit()

//                 //Check last li matches text and check that length of li increased by 1
//                 cy.get('.todo-item:last').should('contain.text', todoText).then(() => {
//                     cy.get('.todo-item').then(($liAdded) => {
//                         expect($liAdded).to.have.length($li.length + 1)
//                     })
//                 })
//             })
//             i++
//         }
//     })

//     // it('Add Task, input empty check border', () => {
//     //     //Get the form by class inline-form, type empty string
//     //     cy.get('.inline-form input[type=text]').should('have.value', '');

//     //     // get button, invoke disabled attribute and try to click it (force: true prevents error message in cypress)
//     //     cy.get('.inline-form input[type=submit')
//     //         .invoke('attr', 'disabled')
//     //         .then(disabled =>{
//     //             disabled ? cy.get('.inline-form input[type=submit').click({force: true}) : null
//     //         })
        
//     //     // returns AssertionError: 'expected ... red, but the value was 'rgb(204, 204, 204)' 
//     //     cy.get('.inline-form input[type=text').should('have.css', 'border-color', 'red')
//     // })

//     it('Add Task, input empty should not be added to list, alternative scenario: border should be red', () => {
//         //Get the form by class inline-form, type empty string
//         cy.get('.inline-form input[type=text]').should('have.value', '');

//         /**
//          * Checks length of li-list, then try to add. Length of li should be same afterwards
//          * As per alternative scenarios border should be red
//          */
//         cy.get('.todo-item').then(($li) => {
//             cy.get('.inline-form input[type=submit').click({force: true})
//             cy.get('.todo-item').then(($liAfterClick) => {
//                 expect($liAfterClick).to.have.length($li.length)
//                 cy.get('.inline-form input[type=text').should('have.css', 'border-color', 'red')

//             })
//         })

//     })
// })

describe('R8UC2 Todo toggle', () => {
    beforeEach(() => {
        cy.request('POST', `${backendUrl}/populate`)

        //Get values from fixture/user.json
        cy.fixture('user').then((fetchedUser) => {
            user = fetchedUser
            
            //Load the page, assert that it is the landing page
            cy.visit(frontendUrl)
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
    afterEach(() => {
        cy.request('GET', `${backendUrl}/users/bymail/${user.email}`).then((user) => {
            cy.request('DELETE', `${backendUrl}/users/${user.body._id.$oid}`)
        })
    })


    it('Activate item to done', () => {
        /**
         * Make sure its unchecked and then proceed with test
         * Click the icon
         * Expect the class of the element is toggled from 'checked unchecked' to 'checked checked'
         */ 
        cy.get('.todo-item').eq(0).find('.unchecked').click()
        cy.wait(2000).then(() => {
            cy.get('.todo-item').eq(0).find('.checker').then(($icon) => {
                expect($icon[0].className).to.match(/checker checked/)
            })
        })
        
        // then(($icon) => {
        //     $icon.dblclick()
        //     cy.wait(2000).then(() => {
        //         cy.get($icon).then(() => {
        //             expect($icon[0].className).to.match(/checker checked/)
        //         })
        //     })
           
        // })   
    })

    // it('Should re-activate done todo', () => {
    //     cy.get('.todo-item').eq(0).find('.checker unchecked').dblclick()
    //     cy.wait(2000).then(() => {
       
    //     })

    // })


})