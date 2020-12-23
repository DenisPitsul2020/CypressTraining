/// <reference types="cypress"/>

import {productsPage} from "../support/pages/ProductsPage";
import {homePage} from "../support/pages/HomePage";
import {shoppingCardPage} from "../support/pages/ShoppingCardPage";

describe('Shopping card suite', () => {

    let testData = {}

    before(() => {
        cy.fixture('testData').then(localTestData => {
            testData = localTestData
        })
    })

    beforeEach(() => {
        cy.openHomePage();
    });

    it('Products should be added to shopping card', () => {
        homePage.openMacs()
        productsPage.addToCart(testData.mac)

        productsPage.openPhones()
        productsPage.addToCart(testData.phone)

        productsPage.openTablets()
        productsPage.addToCart(testData.tablet)

        productsPage.openCardPage()

        shoppingCardPage.getProductElem(testData.mac)
            .should('be.visible')
        shoppingCardPage.getProductElem(testData.phone)
            .should('be.visible')
        shoppingCardPage.getProductElem(testData.tablet)
            .should('be.visible')
    })

})
