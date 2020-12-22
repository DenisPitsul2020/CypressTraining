class HomePage {

    openAllDesktops() {
        cy.get('.navbar-nav a')
            .contains('Desktops')
            .click()
        cy.get('.navbar-nav')
            .contains('Show All Desktops')
            .should('be.visible')
            .click()
    }

}

export const homePage = new HomePage()
