/// <reference types="cypress"/>



import {desktopsPage} from "../support/pages/DesktopsPage";
import {homePage} from "../support/pages/HomePage";

describe('Login suite', () => {

    beforeEach(() => {
        cy.openHomePage();
    });

    it('desktops should be sorted alphabetically', () => {
        homePage.openAllDesktops()

        desktopsPage.getTitle().should('contain', 'Desktops')

        desktopsPage.sortByPriceAscending()

        desktopsPage.checkSortDesktopsAlphabetically()
    })

})
