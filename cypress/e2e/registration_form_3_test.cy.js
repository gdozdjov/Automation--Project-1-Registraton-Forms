beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const bday = '1994-07-15'

import { faker } from '@faker-js/faker'

describe('Bonus Task 1: Visual Tests', () => {
    it('Number of radio buttons is 4 and are clickable', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').last().check().should('be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    })

    it('Radio buttons have correct values', () => {
        cy.get('input[type="radio"]').eq(0).should('have.attr', 'value', 'Daily')
        cy.get('input[type="radio"]').eq(1).should('have.attr', 'value', 'Weekly')
        cy.get('input[type="radio"]').eq(2).should('have.attr', 'value', 'Monthly')
        cy.get('input[type="radio"]').eq(3).should('have.attr', 'value', 'Never')
    })

    it('Image logo exists and has correct size', () => {
        cy.get('img[data-testid="picture"]').should('have.attr', 'src', 'cerebrum_hub_logo.png')
            .and('is.visible')
        cy.get('img[data-testid="picture"]').invoke('width').should('be.greaterThan', 170)
            .and('not.be.lessThan', 150)
        cy.get('img[data-testid="picture"]').invoke('height').should('be.greaterThan', 150)
            .and('be.lessThan', 180)
    })

    it('Checkboxes can be checked and unchecked', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[ng-model="checkbox"]').should('not.be.checked')
        cy.get('input[ng-model="checkbox"]').next().should('not.be.checked')
        cy.get('input[ng-model="checkbox"]').check().should('be.checked')
            .uncheck().should('not.be.checked')
        cy.get('input[ng-model="checkbox"]').next().check().should('be.checked')
            .uncheck().should('not.be.checked')
    })

    it('Cookie policy link is clickable', () => {
        cy.get('a').contains('Accept our cookie policy')
            .should('have.attr', 'href', 'cookiePolicy.html')
            .click()
        cy.url().should('include', 'cookiePolicy.html')
        cy.go('back').url().should('include', 'registration_form_3.html')
    })
})

describe('Bonus Task 2: Functional Tests', () => {
    it('Inputting all data and validating form', () => {
        inputAllData()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.visible')
            .click()
        cy.get('h1').contains('Submission received').should('be.visible')
    })

    it('Inputting only mandatory data and form validation', () => {
        inputMandatoryData()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.visible')
            .click()
        cy.get('h1').contains('Submission received').should('be.visible')
    })
})

function inputAllData() {
    cy.get('#name').clear().type(faker.person.firstName())
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('#country').select('Spain').should('have.value', 'object:3')
    cy.get('#city').select('Malaga')
    cy.get('label').contains('Date of birth').next().click().type(bday)
    cy.get('input[type="radio"]').eq(0).check()
    cy.get('#birthday').type(bday)
    cy.get('input[ng-model="checkbox"]').check()
    cy.get('input[ng-model="checkbox"]').next().check()
    cy.get('#myFile').selectFile('cypress/fixtures/upload_file.html')
}

function inputMandatoryData() {
    cy.get('#name').clear().type(faker.person.firstName())
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('#country').select('Spain').should('have.value', 'object:3')
    cy.get('#city').select('Malaga')
    cy.get('input[ng-model="checkbox"]').check()
    cy.get('#birthday').type(bday)
}