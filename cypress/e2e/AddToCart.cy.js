import CartPage from '../pageObjects/cartPage';
import DashboardPage from '../pageObjects/dashboardPage';

describe("Dash board - ", () => {
    const dashoard = new DashboardPage();
    const cp = new CartPage();

    it("Verify add to cart functionality", () => {
        cy.login();
        cy.visit("https://rahulshettyacademy.com/client");

        dashoard.takeScreenShot();

        dashoard.addToCart(["zara"]);

        dashoard.getButton('cart').get('label').contains("1");
        dashoard.getButton('cart').click();

        cp.validateItemDetails({ item1: ["#6262e95ae26b7e1a10e89bf0", "zara coat 3", " MRP $ 31500", " In Stock"] });

        cp.validateButtonName("Continue Shopping", "Checkout");

        // cp.deleteAllItem();
    })

})