export class BasePage {

    openCardPage() {
        this.openShoppingCartDropDown()
        this.openShoppingCartPageFromDropDown()
    }

    openShoppingCartDropDown() {
        cy.wait(1000)
        cy.get('#cart #cart-total')
            .parent('button')
            .click()
    }

    openShoppingCartPageFromDropDown() {
        cy.get('#cart a')
            .contains('View Cart')
            .click()
    }

    getTotalPriceFromShoppingCartDropDown(productName) {
        return cy.get('.dropdown-menu.pull-right a')
            .contains(productName)
            .parent('td.text-left')
            .next('td.text-right')
            .next('td.text-right')
            .then(priceElem => {
                return priceElem.text()
            })
    }

    openAllDesktops() {
        cy.get('.navbar-nav a')
            .contains('Desktops')
            .click()
        cy.get('.navbar-nav')
            .contains('Show All Desktops')
            .should('be.visible')
            .click()
    }

    openMacs() {
        cy.get('.navbar-nav a')
            .contains('Desktops')
            .click()
        cy.get('.navbar-nav')
            .contains('Mac')
            .should('be.visible')
            .click()
    }

    openPhones() {
        cy.get('.navbar-nav a')
            .contains('Phones')
            .click()
    }

    openTablets() {
        cy.get('.navbar-nav a')
            .contains('Tablets')
            .click()
    }

}