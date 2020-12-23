/// <reference types="cypress"/>

import {productsPage} from "../support/pages/ProductsPage";
import {homePage} from "../support/pages/HomePage";

describe('Sorting item suite', () => {

    beforeEach(() => {
        cy.openHomePage();
    });

    it('Desktops should be sorted alphabetically', () => {
        homePage.openAllDesktops()

        productsPage.getTitle().should('contain', 'Desktops')

        productsPage.sortByPriceAscending()

        productsPage.checkSortDesktopsAlphabetically()
    })

})
