class DesktopsPage {

    getTitle() {
        return cy.get('#content h2')
    }

    sortByPriceAscending() {
        cy.get('label')
            .contains('Sort By')
            .next('select#input-sort')
            .select('Name (A - Z)')
    }

    checkSortDesktopsAlphabetically() {
        let previousProductName = ''
        cy.get('.product-layout .caption a').each((productNameEl, index) => {
            // start to compare from second element
            if (index > 0) {
                // if the previous product name is larger than the current one alphabetically then throw error
                if (previousProductName.localeCompare(productNameEl.text()) === 1) {
                    throw new Error('There are items that have not been sorted')
                }
            }
            // save product name for next step
            previousProductName = productNameEl.text()
        })
    }

}

export const desktopsPage = new DesktopsPage()
