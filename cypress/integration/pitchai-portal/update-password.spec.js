/*
    *************************************************************
     * Change password for the application.
    *************************************************************
*/

import {userEmail, userPassword} from '../.././../config'

context('Change Password', () => {

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

	it('should change the password', () => {
		
		// * Get the current password field.
		cy.get('.field-4 > .floating-label > .form-control')
			.type(userPassword)
			.should('have.value', userPassword)
		
		// * Get the new Password field.
		cy.get('.field-5 > .floating-label > .form-control')
			.type(userPassword)
			.should('have.value', userPassword)
		
		// * Change password.
		cy.get('form.ng-dirty > .action-button > .btn')
			.click()
	})

	it('should not update the password', () => {

		cy.reload()

		cy.wait(5000)

		// * Get the current password field.
		cy.get('.field-4 > .floating-label > .form-control')
			.type(userPassword)
			.should('have.value', userPassword)

		// * Get the new Password field.
		cy.get('.field-5 > .floating-label > .form-control')
			.type('userPassword123')
			.should('have.value', 'userPassword123')
		
		// * Change password.
		cy.get('form.ng-dirty > .action-button > .btn')
			.click()

		cy.wait(1000)

		// * Expect the error
		cy.get('.field-5 > .error-message > .ng-star-inserted')
			.contains('must be')
	})
})