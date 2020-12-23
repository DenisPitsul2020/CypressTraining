class ShoppingCardPage {

    getProductElem(productName) {
        return cy.get('form .table-bordered a')
            .contains(productName)
    }

}

export const shoppingCardPage = new ShoppingCardPage()