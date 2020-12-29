/// <reference types="cypress"/>

import {productsPage} from "../support/pages/ProductsPage";
import {homePage} from "../support/pages/HomePage";
import {shoppingCardPage} from "../support/pages/ShoppingCardPage";

// base url should be http://opencart.abstracta.us/index.php
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

    it.only('Products should be added to shopping card with correct prices', () => {
        homePage.openMacs()
        productsPage.addToCart(testData.mac)

        productsPage.openPhones()
        productsPage.addToCart(testData.phone)

        productsPage.openTablets()
        productsPage.addToCart(testData.tablet)

        productsPage.openShoppingCartDropDown()

        productsPage.getTotalPriceFromShoppingCartDropDown(testData.mac)
            .should('contain', testData.macPrice)
        productsPage.getTotalPriceFromShoppingCartDropDown(testData.phone)
            .should('contain', testData.phonePrice)
        productsPage.getTotalPriceFromShoppingCartDropDown(testData.tablet)
            .should('contain', testData.tabletPrice)

        productsPage.openShoppingCartPageFromDropDown()

        shoppingCardPage.getProductElem(testData.mac)
            .should('be.visible')
        shoppingCardPage.getTotalPrice(testData.mac)
            .should('contain', testData.macPrice)

        shoppingCardPage.getProductElem(testData.phone)
            .should('be.visible')
        shoppingCardPage.getTotalPrice(testData.phone)
            .should('contain', testData.phonePrice)

        shoppingCardPage.getProductElem(testData.tablet)
            .should('be.visible')
        shoppingCardPage.getTotalPrice(testData.tablet)
            .should('contain', testData.tabletPrice)
    })

})
