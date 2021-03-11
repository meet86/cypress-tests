/*
    ********************************************************************
    * This test file is supposed to be run after f-billing-monthly.spec.js
    ********************************************************************
*/
/// <reference types="cypress" />

import {userEmail, userPassword} from '../../../config'

context('User Yearly Billing', () => {

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
	})

	it('should subscribe to yearly plans', () => {
        
		// * Get the Toggle menu.
		cy.get('.mat-menu-trigger')
			.click()
        
		// * Get the Settings.
		cy.get('.mat-menu-content > :nth-child(1)')
			.click()
		
		// * Get the Billing.
		cy.get('.tab-wrapper > :nth-child(3)', {timeout: 10000})
			.click()
		
		cy.wait(2000)

		// * Check the URL.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('account/billing')
		})

		//* Click on Change Plan.
		cy.get('.change-plan > .plan-box > .payment-action > .animate-field')
			.click()

		cy.wait(2000)

		// * Check the URL.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('account/change-plan')
		})

		// * Click on Select to Process further.
		cy.get(':nth-child(2) > .box-main > .box-plan > button')
			.click()
		
		// * Check the Pop Up contents.
		cy.get('.inner-content')
			.contains('Player Yearly')
		
		// * Get the Confirmations.
		cy.get('.action-button > .btn')
			.click()
		
		cy.wait(5000)

	})

})