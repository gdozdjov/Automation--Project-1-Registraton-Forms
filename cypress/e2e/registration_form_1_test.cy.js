// Before each test (it...) load .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

describe('This is first test suite, German Dozdjov', () => {
    // Today's date is 26/07/2023
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('input[name="password"]').type('RandomPass321')
        cy.get('[name="confirm"]').type('RandomPass321')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')

        cy.get('#username').type('Something')
        cy.get('#firstName').type('Sub-Zero')
        cy.get('[data-testid="lastNameTestId"]').type('Bi-Han')

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approach
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        // next 2 lines check exactly the same, but using different approach
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('RandomPass321')
        cy.get('[name="confirm"]').type('RandomPass321123')
        
        // type('{enter}') is clicking native button e.g to click backspace use '{backspace}'
        cy.get('[name="confirm"]').type('{enter}')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('RandomPass321')
        cy.get('[name="confirm"]').type('RandomPass321')

        // Scroll back to username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain given text
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that username has tooltip with error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    it('User cannot submit data when phone number is absent', () => {
        cy.get('#username').type('Username1234')
        cy.get('#firstName').type('Scorpion')
        cy.get('#lastName').type('TrueKahn')
        cy.get('[data-testid="phoneNumberTestId"]').type('37259102424')
        cy.get('[name="password"]').type('Password001')
        cy.get('[name="confirm"]').type('Password001')

        cy.get('[data-testId="phoneNumberTestId"]').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('[class="submit_button"]').should('be.disabled')

        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('input[name="username"]').type('Sektor20')
        cy.get('input[name="firstName"]').type('Sektor')
        cy.get('input[name="lastName"]').type('Bogdanovich')
        cy.get('input[data-testid="phoneNumberTestId"]').type('420420420')
        cy.get('input[name="password"]').type('Sektor5050')
        cy.get('input[name="confirm"]').type('Sektor5050')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('input[name="password"]').scrollIntoView().clear()
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('input[name="confirm"]').scrollIntoView().clear()
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('input[name="confirm"]').type('Seltpr5050')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
    })

    it('User cannot add letters to phone number', () => {
        cy.get('#username').type('Cyrax340')
        cy.get('#firstName').type('Cyrax')
        cy.get('#lastName').type('Yellow')
        cy.get('[name="password"]').type('Letters101')
        cy.get('[name="confirm"]').type('Letters101')
        cy.get('[data-testid="phoneNumberTestId"]').type('letters')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('h2').contains('Phone number').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })
})