import BasePage from "./basePage";

export default class DashboardPage extends BasePage {

    takeScreenShot() {
        const itemBlock = cy.get('.card').first().find('.card-body');
        itemBlock.screenshot('addToCart');
    }

    addToCart(itemName = []) {
        for (let i = 0; i < itemName.length; i++) {
            const title = cy.get('h5').contains(itemName[i]).parents();
            title.contains('.w-10', " Add To Cart").click();
        }
    }

    validateCategoryBaseFilter(filterName = "") {
        const categories = cy.get('#sidebar').contains(filterName).parent()
        return categories.find('input').check();
    }
}