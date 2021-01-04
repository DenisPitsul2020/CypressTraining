/// <reference types="cypress"/>


// base url should be "https://test24.com.ua/",
describe('Course api suite', () => {

    let testData = {}

    before(() => {
        cy.fixture('apiTestData').then(localTestData => {
            testData = localTestData
        })
    });

    it('course should be created with teacher account', () => {
        const userCredentials = {
            username: testData.teacherUsername,
            password: testData.password
        }

        cy.request({
            method: 'POST',
            url: 'https://test24.com.ua/api/v1/auth-token/token/login/',
            body: userCredentials
        }).its('body.auth_token')
            .then(authToken => {
                cy.request({
                    method: 'POST',
                    url: 'https://test24.com.ua/api/v1/post/create/courses/',
                    headers: {
                        Authorization: 'Token ' + authToken
                    },
                    body: {
                        name: testData.courseName
                    }
                }).then(response => {
                    expect(response.status).to.equal(201)
                    expect(response.body.name).to.equal(testData.courseName)
                })
            })
    })

    it('course should not be created with student account', () => {
        const userCredentials = {
            username: testData.username,
            password: testData.password
        }

        cy.request({
            method: 'POST',
            url: 'https://test24.com.ua/api/v1/auth-token/token/login/',
            body: userCredentials
        }).its('body.auth_token')
            .then(authToken => {
                cy.request({
                    method: 'POST',
                    url: 'https://test24.com.ua/api/v1/post/create/courses/',
                    headers: {
                        Authorization: 'Token ' + authToken
                    },
                    body: {
                        name: testData.courseName
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.equal(400)
                    expect(response.body).to.equal('You are not a Teacher')
                })
            })
    })

    it('should contain at least one course', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/courses/list?page=1')
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.count).to.be.greaterThan(0)
                expect(response.body.results[0]).to.exist
            })
    })

    it('should contain correct course name by search text', () => {
        const searchTextLength = testData.courseName.length
        const searchText = testData.courseName.substring(0, searchTextLength / 2 + 1)
        cy.request('GET', 'https://test24.com.ua/api/v1/post/search?search=' + searchText)
            .then(response => {
                expect(response.status).to.equal(200)
                response.body.results.forEach(course => {
                    expect(course.name).to.contain(searchText)
                })
            })
    })

    it('should contain at least one section in course', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/courses/list?page=1')
            .then(courseResponse => {
                expect(courseResponse.status).to.equal(200)
                const courseId = courseResponse.body.results[0].id

                cy.request('GET', `https://test24.com.ua/api/v1/post/section/list/${courseId}/?page=1`)
                    .then(sectionResponse => {
                        expect(sectionResponse.status).to.equal(200)
                        expect(sectionResponse.body.count).to.be.greaterThan(0)
                        expect(sectionResponse.body.results[0]).to.exist
                    })
            })
    })

    it('should contain at least one section element in course section', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/courses/list?page=1')
            .then(courseResponse => {
                expect(courseResponse.status).to.equal(200)
                const courseId = courseResponse.body.results[0].id

                cy.request('GET', `https://test24.com.ua/api/v1/post/section/list/${courseId}/?page=1`)
                    .then(sectionResponse => {
                        expect(sectionResponse.status).to.equal(200)
                        const sectionId = sectionResponse.body.results[0].id

                        cy.request('GET', `https://test24.com.ua/api/v1/post/element/section/list/${sectionId}/?page=1`)
                            .then(sectionElementResponse => {
                                console.log(sectionElementResponse)
                                expect(sectionElementResponse.status).to.equal(200)
                                expect(sectionElementResponse.body.count).to.be.greaterThan(0)
                                expect(sectionElementResponse.body.results[0]).to.exist
                            })
                    })
            })
    })

})