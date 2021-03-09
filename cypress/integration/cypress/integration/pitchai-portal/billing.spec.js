/// <reference types="cypress" />

import {coachEmail, coachPassword} from '../../../../../config'

context('User Billing', () => {
	beforeEach(() => {
		cy.restoreLocalStorage()
	})

	afterEach(() => {
		cy.saveLocalStorage() 
	})
	// * Logins the User and redirects to the Dashboard.
	it('should login and redirect to the dashboard', () => {

		cy.visit('https://fe-test.proplayai.com/')

		// * Get the Email Input Field and type the email address.
		cy.get('input[formcontrolname="userNameOrEmailAddress"]')
			.type(coachEmail)
			.should('have.value', coachEmail)
		
		// * Get the Password Input field and type the password.
		cy.get('input[formcontrolname="password"]')
			.type(coachPassword)
			.should('have.value', coachPassword)

		// * Click on the Login button.
		cy.get('button[type=submit]')
			.click()

		// * Wait for API calls to return with the results.
		cy.wait(7000)

		// * Checks if the URL changed, this time URL should change.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('user/dashboard')
		})
		
	})

	// * Subscribes to the Plan (Monthly).
	it('should subscribe to the monthly subscription', () => {

		//* Get the Upgrade Now Button.
		cy.get('button').contains('Upgrade Now').then(($upgradeBtn) => {
			cy.wrap($upgradeBtn).click()
		})

		// * Wait for the Page load and API Response
		cy.wait(5000)


		// * Get the Subscribe button.
		cy.get('button').then(($subscribeBtn) => {
			cy.wrap($subscribeBtn).click()
		})

		// * Wait for the Page load and API Response
		cy.wait(2000)

		// * Check the URL Change.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('change-plan')
		})

		cy.get(':nth-child(1) > .box-main > .box-plan > .btn').then(($monthlySelect) => {
			cy.wrap($monthlySelect).click()
		})

	})
})