/// <reference types="cypress"/>


// base url should be "https://test24.com.ua/",
describe('Api auth suite', () => {

    let testData = {}

    beforeEach(() => {
        //login, get auth token by username and password
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

    it('Should get user info', () => {
        cy.get('@authToken').then(authToken => {
            // get user info(id, username, email)
            cy.request({
                method: 'GET',
                url: 'https://test24.com.ua/api/v1/user/',
                headers: {
                    Authorization: 'Token ' + authToken
                }
            }).then(response => {
                expect(response).to.have.property('status', 200)
                expect(response.body.username).to.equal(testData.username)
                expect(response.body.email).to.equal(testData.email)
            })
        })
    })

    // extended previous test
    it('Should get user info and user detail', () => {
        cy.get('@authToken').then(authToken => {
            // get user info(id, username, email)
            cy.request({
                method: 'GET',
                url: 'https://test24.com.ua/api/v1/user/',
                headers: {
                    Authorization: 'Token ' + authToken
                }
            }).then(userInfoResponse => {
                expect(userInfoResponse).to.have.property('status', 200)
                expect(userInfoResponse.body.username).to.equal(testData.username)
                expect(userInfoResponse.body.email).to.equal(testData.email)

                // get user detail(first name, last name, phone)
                cy.request({
                    method: 'GET',
                    url: `https://test24.com.ua/api/v1/user/profile/${userInfoResponse.body.id}/`
                }).then(userDetailResponse => {
                    expect(userDetailResponse).to.have.property('status', 200)
                    expect(userDetailResponse.body.first_name).to.equal(testData.firstName)
                    expect(userDetailResponse.body.last_name).to.equal(testData.lastName)
                    expect(userDetailResponse.body.phone).to.equal(testData.phone)
                })
            })
        })
    })

})