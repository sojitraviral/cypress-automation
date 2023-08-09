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
            const itemBlock = cy.get('.cart > ul').first().find('.cartSection');
            //cy.log(itemBlock);
            const itemValue = Object.values(itemDetails)[i];
            itemBlock.find("h3").should('have.text', itemValue[1]);
            // itemBlock.find("P").first().should('have.text', itemValue[0]);


            // itemBlock.find("P").select(1).should('have.text', itemValue[2]);
            // itemBlock.find(".stockStatus").should('have.text', itemValue[3]);
            // itemBlock.find("button").first().should('have.text', itemValue[4]);
            // itemBlock.find("button").last().should('have.text', itemValue[5]);
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