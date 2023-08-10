/// <reference types="Cypress" />

import BasePage from "./basePage";

export default class CartPage extends BasePage {
    constructor() {
        super()
    }

    validateItemDetails(itemDetails = {}) {
        const itemCount = Object.values(itemDetails).length;
        this.getButton('cart').get('label').contains(`${itemCount}`);

        for (let i = 0; i < itemCount; i++) {
            cy.get('.cart > ul').eq(i).find('.cartSection').as('verifyItemDetails');
            const itemValue = Object.values(itemDetails)[i];
            cy.get('@verifyItemDetails').children('p').first().should('have.text', itemValue[0]);
            cy.get("@verifyItemDetails").find('h3').should('have.text', itemValue[1]);
            cy.get("@verifyItemDetails").find('h3').next().should('have.text', itemValue[2]);
            cy.get("@verifyItemDetails").find('.stockStatus').should('have.text', itemValue[3]);
        }
    }

    validateButtonName(buttonName = "", checkoutButton = "") {
        cy.contains(buttonName).should('be.visible');
        cy.contains(checkoutButton).should('be.visible');
    }

    deleteAllItem() {
        cy.get('[class="btn btn-danger"]').each(($button) => {
            cy.wrap($button).click();
        })

        const emptyCartMsg = cy.get(".wrap > div:nth-child(2)");
        emptyCartMsg.find("h1").should('have.text', "No Products in Your Cart !");
    }
}