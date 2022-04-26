/** 
 * R8UC1, R8UC2, R8UC3
 */


describe('Todo', () => {
    var user;
    before(() => {
        //Get values from fixture/user.json
        cy.fixture('user').then((fetchedUser) => {
            user = fetchedUser
            
            //Load the page, assert that it is the landing page
            cy.visit('http://localhost:3000')
            cy.get('h1').should('contain.text', 'Login')

            //Login
            cy.contains('div', 'Email Address').find('input').type(user.email)
            cy.get('form').submit()

            //Control first page
            cy.get('h1').should('contain.text', `Your tasks, ${user.firstName} ${user.lastName}`)
        })
    })


    it('Login', () => {
    })
})