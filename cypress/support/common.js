/*
    *************************************************************
     * Common Functions for reusablity
    *************************************************************
*/

/// <reference types="cypress" />
import {coachEmail, coachPassword} from '../../config'

// * Login Function.
export function loginUser() {
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
}