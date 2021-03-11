/*
    *************************************************************
     * Update User Profile.
    *************************************************************
*/

import {userEmail, userPassword} from '../.././../config'

context('User Profile Update', () => {

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

	it('should update the profile', () => {

		cy.wait(1500)
		
		// Player Name
		cy.get('form.ng-untouched > :nth-child(1) > .floating-label > .form-control')
			.clear()
			.type('Player 1')
			.should('have.value', 'Player 1')
		
		// Player Surname
		cy.get('form.ng-untouched > :nth-child(2) > .floating-label > .form-control')
			.clear()
			.type('Surname 1')
			.should('have.value', 'Surname 1')
		
		// Update the data.
		cy.get('form.ng-valid > .action-button > .btn')
			.click()
	})

})