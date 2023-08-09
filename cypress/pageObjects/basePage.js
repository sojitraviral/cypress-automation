export default class BasePage {

    validateTosterMessage(message) {
        const toster = cy.get('#toast-container');
        toster.should('contain', message);
        // toster.should('not.be.visible');
    }

    getButton(btnName = '') {
        if (btnName == 'sign out') return cy.contains(' Sign Out ')
        return cy.get(`[routerlink='/dashboard/${btnName}']`)
    }
}