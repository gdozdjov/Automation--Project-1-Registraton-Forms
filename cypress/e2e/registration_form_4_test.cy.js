beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

import { faker } from '@faker-js/faker';

// Assignement 6: analyze and fix failed test
describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        validInputData()
        cy.get('#username').scrollIntoView().clear()
        cy.get('h2').contains('Password section').click()
        cy.get('#input_error_message').should('have.css', 'display', 'block')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Username tooltip is visible', () => {
        cy.get('#username').type(faker.internet.userName())
            .clear()
        cy.get('h2').contains('Password section').click()
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        cy.get('#username').should('have.attr', 'min', '1')
        cy.get('#username').should('have.attr', 'max', '50')
    })

    it('Username should support only lower letters and numbers', () => {
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

    it('Email input should support correct pattern', () => {
        cy.get('#email').should('have.attr', 'pattern', '[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled')
    })

    it('User cannot submit empty registration form', () => {
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('not.be.enabled')
    })

    it('BMW should not be listed in cars list', () => {
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars option').first().should('not.have.text', 'BMW')
        cy.get('#cars option').eq(1).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(2).should('not.have.text', 'BMW')
        cy.get('#cars option').last().should('not.have.text', 'BMW')
    })
})

function validInputData() {
    cy.get('#username').type(faker.internet.userName())
    cy.get('#email').type('rayden404@gmail.com')
    cy.get('[data-cy="name"]').type(faker.person.firstName())
    cy.get('[data-testid="lastNameTestId"]').type(faker.person.lastName())
    cy.get('[data-testid="phoneNumberTestId"]').type(faker.phone.number('########'))
    const randomPassword = faker.internet.password({ length: 6 })
    cy.get("input[name='password']").type(randomPassword)
    cy.get('[name="confirm"]').type(randomPassword)
}