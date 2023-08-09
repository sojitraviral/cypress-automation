// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// login method

Cypress.Commands.add('login', () => {

    cy.request({
        method: "POST",
        url: "https://rahulshettyacademy.com/api/ecom/auth/login",
        body: {
            userEmail: 'viral@gmail.com',
            userPassword: 'Viral123',
        }
    }).then(response => {
        cy.log(response);
        expect(response.status).to.eql(200);
        window.localStorage.setItem('token', response.body.token)
    })

})