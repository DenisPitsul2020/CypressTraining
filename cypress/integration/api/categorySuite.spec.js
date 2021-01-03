/// <reference types="cypress"/>


// base url should be "https://test24.com.ua/",
describe('Category api suite', () => {

    it('should contain at least one category', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/category/list?page=1')
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.count).to.be.greaterThan(0)
                expect(response.body.results[0]).to.exist
            })
    })

    it('should contain at least one subcategory in category', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/category/list?page=1')
            .then(categoryResponse => {
                expect(categoryResponse.status).to.equal(200)
                const categoryId = categoryResponse.body.results[0].id

                cy.request('GET', `https://test24.com.ua/api/v1/post/sub/category/list/${categoryId}?page=1`)
                    .then(subCategoryResponse => {
                        expect(subCategoryResponse.status).to.equal(200)
                        expect(subCategoryResponse.body.count).to.be.greaterThan(0)
                        expect(subCategoryResponse.body.results[0]).to.exist
                    })
            })
    })

    it('should contain at least one topic in subcategory', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/category/list?page=1')
            .then(categoryResponse => {
                expect(categoryResponse.status).to.equal(200)
                const categoryId = categoryResponse.body.results[0].id

                cy.request('GET', `https://test24.com.ua/api/v1/post/sub/category/list/${categoryId}?page=1`)
                    .then(subCategoryResponse => {
                        expect(subCategoryResponse.status).to.equal(200)
                        const subCategoryId = subCategoryResponse.body.results[0].category.id

                        cy.request('GET', `https://test24.com.ua/api/v1/post/topic/list/${subCategoryId}?page=1`)
                            .then(topicResponse => {
                                expect(topicResponse.status).to.equal(200)
                                expect(topicResponse.body.count).to.be.greaterThan(0)
                                expect(subCategoryResponse.body.results[0]).to.exist
                            })
                    })
            })
    })

    it('study topics should contain only open tests without exams and passwords', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/category/list?page=1')
            .then(categoryResponse => {
                expect(categoryResponse.status).to.equal(200)
                const categoryId = categoryResponse.body.results[0].id

                cy.request('GET', `https://test24.com.ua/api/v1/post/sub/category/list/${categoryId}?page=1`)
                    .then(subCategoryResponse => {
                        expect(subCategoryResponse.status).to.equal(200)

                        let subCategoryId = -1
                        subCategoryResponse.body.results.forEach(subCategory => {
                            if (subCategory.name === 'Курс ЗНО') {
                                subCategoryId = subCategory.id
                            }
                        })
                        if (subCategoryId === -1) {
                            const errorMessage = 'Category '+categoryResponse.body.results[0].name+' does not have subcategory "Курс ЗНО"'
                            throw new Error(errorMessage)
                        } else {
                            cy.request('GET', `https://test24.com.ua/api/v1/post/topic/list/${subCategoryId}?page=1`)
                                .then(topicResponse => {
                                    expect(topicResponse.status).to.equal(200)

                                    topicResponse.body.results.forEach(topic => {
                                        expect(topic.open).to.equal(true)
                                        expect(topic.password_topic).to.be.null
                                        expect(topic.exam).to.equal(false)
                                    })
                                })
                        }
                    })
            })
    })

    it('Not study topics should contain only exams', () => {
        cy.request('GET', 'https://test24.com.ua/api/v1/post/category/list?page=1')
            .then(categoryResponse => {
                expect(categoryResponse.status).to.equal(200)
                const categoryId = categoryResponse.body.results[0].id

                cy.request('GET', `https://test24.com.ua/api/v1/post/sub/category/list/${categoryId}?page=1`)
                    .then(subCategoryResponse => {
                        expect(subCategoryResponse.status).to.equal(200)

                        let subCategoryId = -1
                        subCategoryResponse.body.results.forEach(subCategory => {
                            if (subCategory.name === 'Пробне ЗНО') {
                                subCategoryId = subCategory.id
                            }
                        })

                        if (subCategoryId === -1) {
                            const errorMessage = 'Category '+categoryResponse.body.results[0].name+' does not have subcategory "Пробне ЗНО"'
                            throw new Error(errorMessage)
                        } else {
                            cy.request('GET', `https://test24.com.ua/api/v1/post/topic/list/${subCategoryId}?page=1`)
                                .then(topicResponse => {
                                    expect(topicResponse.status).to.equal(200)

                                    topicResponse.body.results.forEach(topic => {
                                        expect(topic.exam).to.equal(true)
                                    })
                                })
                        }
                    })
            })
    })

})