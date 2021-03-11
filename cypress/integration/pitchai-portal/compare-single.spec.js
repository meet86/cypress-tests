/*
    *************************************************************
     * Compare the Pitching of the same player
    *************************************************************
*/

import {coachEmail, coachPassword} from '../../../config'

context('Compare Single Player', () => {

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

	it('should compare pitches for single player', () => {
		
		cy.wait(2000)
		
		// * Get the players 
		cy.get('.sidebar-link > .list-inline > :nth-child(2) > a')
			.click()
		
		cy.wait(3000)

		// * Go the player section
		cy.get(':nth-child(4) > .td-w-5 > .arrow-btn > .img-fluid')
			.click()
		
		// * Select Pitch 1
		cy.get(':nth-child(1) > .td-w-10 > .form-checkbox > label > span')
			.click({force: true})
		
		// * Select Pitch 2
		cy.get(':nth-child(2) > .td-w-10 > .form-checkbox > label > span')
			.click({force: true})

		// * Compare
		cy.get('.right-section > button')
			.click()
		
		cy.wait(3000)
		
		// * Check the URL.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('user/compare/details')
		})
		
	})
})