export class BasePage {

    openCardPage() {
        cy.get('#cart #cart-total')
            .parent('button')
            .click()
        cy.get('#cart a')
            .contains('View Cart')
            .click()
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