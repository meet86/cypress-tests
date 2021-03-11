/*
	****************************************************************************
    * Scenario
    * If user wants to directly get the Yearly subscription, rather than the... 
    * first goes for montly and then goes for the yearly scenario.
	****************************************************************************
*/


/// <reference types="cypress" />
import '../../support/commands'
import {coachEmail, coachPassword} from '../../../config'

context('User Billing', () => {
	beforeEach(() => {
		cy.restoreLocalStorage()
	})

	afterEach(() => {
		cy.saveLocalStorage() 
	})
	// * Logins the User and redirects to the Dashboard.
	it('should login and redirect to the dashboard',  () => {

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

	// * Subscribes to the Plan (Yearly).
	it('should subscribe to the yearly subscription', () => {

		cy.get('button').contains('Upgrade Now').then(($upgradeBtn) => {
			cy.wrap($upgradeBtn).click()
		})
		
		// * Wait for the Page load and API Response
		cy.wait(5000)
		
		// * Get the Subscribe button.
		cy.get('.btn').click()
		
		// * Wait for the Page load and API Response
		cy.wait(2000)
		
		// * Check the URL Change.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('change-plan')
		})
		
		cy.get(':nth-child(2) > .box-main > .box-plan > .btn').then(($monthlySelect) => {
			cy.wrap($monthlySelect).click()
		})
		
		cy.wait(1000)
		
		// * Get the email Field.
		cy.get('input[formControlName="email"]')
			.type(coachEmail)
			.should('have.value', coachEmail)
				
		// * Get the Name On Card Field.
		cy.get('input[formControlName="name"]')
			.type('TestCoach')
			.should('have.value', 'TestCoach')
				
		// * Get the Card Number Field.
		cy.wait(2000)
		
		cy.getWithinIframe('[name="cardnumber"]')
			.type('4242424242424242')
			.should('have.value', '4242 4242 4242 4242')
		
		// * Get the Expiry Date Field.
		cy.getWithinIframe('[name="exp-date"]')
			.type('1232')
			.should('have.value', '12 / 32')
				
		// * Get the CVV Field.
		cy.getWithinIframe('[name="cvc"]')
			.type('987')
			.should('have.value', '987')
				
		// * Get the Postal Code Field.
		cy.get('input[formControlName="postCode"]')
			.type('12345')
			.should('have.value', '12345')
				
		cy.get('.action-button > .btn').then(($subscribeBtn) => {
			cy.wrap($subscribeBtn).click()
		})

	})

})