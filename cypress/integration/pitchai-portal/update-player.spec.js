/*
    *************************************************************
     * Update Player Profile.
     * Information like Height, Birthdate etc.
    *************************************************************
*/

import {userEmail, userPassword} from '../.././../config'

context('Player Info Update', () => {

	beforeEach(() => {
		cy.restoreLocalStorage()
	})

	afterEach(() => {
		cy.saveLocalStorage() 
	})

	it('should login to the app', () => {
		cy.visit('https://fe-test.proplayai.com/')

		// * Get the Email Input Field and type the email address.
		cy.get('input[formcontrolname="userNameOrEmailAddress"]')
			.type(userEmail)
			.should('have.value', userEmail)
		
		// * Get the Password Input field and type the password.
		cy.get('input[formcontrolname="password"]')
			.type(userPassword)
			.should('have.value', userPassword)

		// * Click on the Login button.
		cy.get('button[type=submit]')
			.click()

		// * Wait for API calls to return with the results.
		cy.wait(7000)

		// * Checks if the URL changed, this time URL should change.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('user/dashboard')
		})

		// * Get the Toggle menu.
		cy.get('.mat-menu-trigger')
			.click()
        
		// * Get the Settings.
		cy.get('.mat-menu-content > :nth-child(1)')
			.click()
	})

	it('should update the Player details', () => {
        
		cy.wait(1500)

		// * Get the Player Info tab.
		cy.get('.tab-wrapper > :nth-child(2)')
			.click()
		
		cy.wait(1000)

		// * Get the Date Picker.
		cy.get('.field-3 > .floating-label > .form-control')
			.click()
		
		// * Get the Year.
		cy.get('.mat-calendar-period-button > .mat-button-wrapper')
			.click()
		
		cy.get('[aria-label="1999"] > .mat-calendar-body-cell-content')
			.click()
		
		cy.get('[aria-label="July 1999"] > .mat-calendar-body-cell-content')
			.click()
		
		cy.get('[aria-label="July 9, 1999"] > .mat-calendar-body-cell-content')
			.click()
		
		// * Get the feet input.
		cy.get('.row > :nth-child(1) > .floating-label > .form-control')
			.clear()
			.type('6')
			.should('have.value', '6')
		
		// * Get the inches input.
		cy.get(':nth-child(2) > .floating-label > .form-control')
			.clear()
			.type('6')
			.should('have.value', '6')
		
		// * Get the Weight input.
		cy.get(':nth-child(4) > .floating-label > .form-control')
			.clear()
			.type('121')
			.should('have.value', '121')
		
		// * Get the Handedness input.
		cy.get('.field-7 > .radio-label')
			.click({force: true})
		
		cy.wait(1500)

		// * Update the info.
		cy.get('.btn')
			.click()
	})
})