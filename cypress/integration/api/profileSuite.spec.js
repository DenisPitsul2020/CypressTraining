/// <reference types="cypress"/>


// base url should be "https://test24.com.ua/",
describe('Profile api suite', () => {

    let testData = {}

    beforeEach(() => {
        cy.fixture('apiTestData').then(localTestData => {
            testData = localTestData

            const userCredentials = {
                username: testData.username,
                password: testData.password
            }

            cy.request({
                method: 'POST',
                url: 'https://test24.com.ua/api/v1/auth-token/token/login/',
                body: userCredentials
            }).its('body.auth_token')
                .as('authToken')
        })
    });

    it('should update first name, last name and phone', () => {

        cy.get('@authToken').then(authToken => {
            cy.request({
                method: 'GET',
                url: 'https://test24.com.ua/api/v1/user/',
                headers: {
                    Authorization: 'Token ' + authToken
                }
            }).then(response => {
                expect(response.status).to.equal(200)

                cy.request({
                    method: 'PATCH',
                    headers: {
                        Authorization: 'Token ' + authToken
                    },
                    url: `https://test24.com.ua/api/v1/user/profile/${response.body.id}/`,
                    body: {
                        first_name: testData.newFirstName,
                        last_name: testData.newLastName,
                        phone: testData.newPhone
                    }
                }).then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.first_name).to.equal(testData.newFirstName)
                    expect(response.body.last_name).to.equal(testData.newLastName)
                    expect(response.body.phone).to.equal(testData.newPhone)
                })
            })
        })

    })

})