/// <reference types="cypress"/>


// base url should be "https://test24.com.ua/",
describe('Registration api suite', () => {

    it('should be registered', () => {
        const max = 9999999
        const min = 1000000
        const index = Math.floor(Math.random() * (max - min) + min)
        console.log(index)

        const userCredentials = {
            email: `test${index}@gmail.com`,
            username: `Test${index}`,
            password: `useruser${index}`
        }

        // register user with email, username and password
        cy.request({
            method: "POST",
            url: "/api/v1/auth/users/",
            body: userCredentials
        }).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.email).to.equal(userCredentials.email)
            expect(response.body.username).to.equal(userCredentials.username)
        })
    })

    it('should not be registered with existing username', () => {
        cy.fixture('apiTestData').then(testData => {
            const userCredentials = {
                email: testData.email,
                username: testData.username,
                password: testData.password
            }

            // try to register user with existing email and username
            cy.request({
                method: "POST",
                url: "/api/v1/auth/users/",
                body: userCredentials,
                failOnStatusCode: false,
            }).then(response => {
                expect(response.status).to.equal(400)
                expect(response.body.username[0]).to.contain('username already exists')
            })
        })

    })

})