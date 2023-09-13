beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

import { faker, fi } from '@faker-js/faker'
const username = faker.internet.userName()
const email = 'rayden404@gmail.com'
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const phoneNum = faker.phone.number('#######')
const password = faker.internet.password({ length: 6 })

/*
Assignement 4: add content to the following tests - DONE
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type(username)
        cy.get('#email').type(email)
        cy.get('[name="name"]').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phoneNum)
        cy.get('#password').type(password)
        cy.get('#confirm').type(faker.internet.password({ length: 7 }))
        cy.get('p').contains('NB! Passwords should match').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#password_error_message').should('be.visible')

        //Changing password inputs so they match
        cy.get('#confirm').scrollIntoView().clear().type(password)
        cy.get('p').contains('NB! Passwords should match').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
    })

    it('User can submit form with all fields added', () => {
        cy.get('#username').type(username)
        cy.get('#email').type(email)
        cy.get('[name="name"]').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phoneNum)
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#cars').select('audi')
        cy.get('#animal').select('hippo')
        cy.get('#password').type(password)
        cy.get('#confirm').type(password)

        // Veryfing that correctly filled out form can be successfuly submited
        cy.get('h2').contains('Select your favourite animal').click()
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        inputValidData('Raiden404')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User is unable to submit form if the last name field is missing data', () => {
        inputValidData('Kano101')
        inputUnmandatory()
        cy.get('#lastName').scrollIntoView().clear()
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })
})

/*
Assignement 5: Visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        cy.log('Checking size parameters for the second picture')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src', 'cypress_logo.png')
        cy.get('img[data-cy="cypress_logo"').invoke('height').should('be.lessThan', 90)
            .and('be.greaterThan', 80)
        cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 120)
            .and('be.greaterThan', 110)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check naviagtion for the second link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('have.attr', 'href', 'registration_form_3.html')
            .and('be.visible')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Verifying that checkboxes work correctly', () => {
        cy.get('input[type="radio"]').should('have.length', 4).should('not.be.checked')
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
        cy.get('input[type="radio"]').eq(0).check()
            .should('be.checked')
        cy.get('input[type="radio"]').eq(1).check()
            .should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
})

function inputValidData(username) {
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type(email)
    cy.get('[data-cy="name"]').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNum)
    cy.get('#cars').select(2)
    cy.get('#animal').select(3)
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type(password)
    cy.get('#confirm').type(password)
    cy.get('h2').contains('Password').click()
}

function inputUnmandatory() {
    cy.get('#vehicle1').click()
    cy.get('#vehicle2').click()
    cy.get('#vehicle3').click()
    cy.get('#javascriptFavLanguage').click()
}