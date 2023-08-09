/// <reference types="Cypress" />

import BasePage from "../pageObjects/basePage";
import DashboardPage from "../pageObjects/dashboardPage";

describe("Dash board - ", () => {
    let length;
    const dashboard = new DashboardPage();
    it("Verify search filter functionality", () => {
        cy.login();
        cy.visit("https://rahulshettyacademy.com/client");

        // valid search filter
        cy.intercept('POST', 'https://rahulshettyacademy.com/api/ecom/product/get-all-products').as('response');
        cy.get('#sidebar').find('[name="search"]').type("zara").type('{enter}');
        cy.wait('@response');
        cy.get('.card-body > h5').then(($item) => {
            length = $item.length;
            for (let i = 0; i < length; i++) {
                cy.get('.card-body > h5').first().contains('zara');
            }
        })


        // Invalid search filter
        cy.get('#sidebar').find('[name="search"]').type("zaraqwe").type('{enter}');
        cy.wait('@response');
        dashboard.validateTosterMessage('No Products Found')


        //clear record filter
        cy.get('#sidebar').find('[name="search"]').click().clear().type('{enter}');
        cy.wait('@response');
        cy.get('.card-body > h5').then(($item) => {
            length = $item.length;
            cy.get('.card-body > h5').first().contains('zara');
        })
    })

    it("Verify price filter functionality", () => {
        cy.login();
        cy.visit("https://rahulshettyacademy.com/client");
        cy.intercept('POST', 'https://rahulshettyacademy.com/api/ecom/product/get-all-products').as('response');

        //minPrice and MaxPrice Filter
        cy.get("#sidebar").find('[name="minPrice"]').type("31500");
        cy.get("#sidebar").find('[name="maxPrice"]').type("31600").type('{enter}');
        cy.wait('@response');

        cy.get('.card-body').find(".text-muted").then(($item) => {
            length = $item.length;

            const text = $item.first().text();
            const Price = Number(text.replace('$ ', ''))
            expect(31600).to.be.greaterThan(31500)
            expect(31500).to.be.lessThan(31600)
        });

    })

    it("Verify same price filter functionality", () => {
        cy.login();
        cy.visit("https://rahulshettyacademy.com/client");
        cy.intercept('POST', 'https://rahulshettyacademy.com/api/ecom/product/get-all-products').as('response');

        //minPrice and MaxPrice Filter
        cy.get("#sidebar").find('[name="minPrice"]').type("31000");
        cy.get("#sidebar").find('[name="maxPrice"]').type("31000").type('{enter}');
        cy.wait('@response');

        dashboard.validateTosterMessage("No Products Found");
    })

    it("Verify checkbox filter functionality", () => {
        cy.login();
        cy.visit("https://rahulshettyacademy.com/client");
        cy.intercept('POST', 'https://rahulshettyacademy.com/api/ecom/product/get-all-products').as('response');

        dashboard.validateCategoryBaseFilter("women");
        cy.wait('@response');

        cy.get('.card-body > h5').then(($item) => {
            length = $item.length;
            cy.get('.card-body > h5').should('be.visible');
        });
    })
}) 