class ShoppingCardPage {

    getProductElem(productName) {
        return cy.get('form .table-bordered a')
            .contains(productName)
    }

    getTotalPrice(productName) {
        return cy.get('form .table-bordered a')
            .contains(productName)
            .parents('tr')
            .find('td.text-right')
            .last()
            .then(priceElem => {
                return priceElem.text()
            })
    }

}

export const shoppingCardPage = new ShoppingCardPage()