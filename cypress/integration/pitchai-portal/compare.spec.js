/*
    *************************************************************
     * Compare the Pitching between two players
    *************************************************************
*/

import {coachEmail, coachPassword} from '../../../config'

context('Pitch Compare', () => {

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

	it('should compare pitches between 2 players.', () => {
        
		// * Get the compare link/button.
		cy.get('.sidebar-link > .list-inline > :nth-child(3) > a')
			.click()
		
		// * Select an option from the dropdown list for Player 1.
		cy.get('.player-1 > .player-data-form > .player-select > .ng-untouched > .form-group > .floating-label > .form-control')
			.select('big nate')

		// * Wait for the API Callsites
		cy.wait(3000)
		
		// * Get the Player-2 Dropdown.
		cy.get('.player-2 > .player-data-form > .player-select > .ng-untouched > .form-group > .floating-label > .form-control')
			.select('Brauny Munoz')

		// * Wait for the API Callsites
		cy.wait(3000)
		
		// * Get the Player 1 Pitch Video.
		cy.get('owl-stage.ng-tns-c221-4 > :nth-child(1) > .owl-stage > .active > .slider-box')
			.click()
		
		// * Get the Player 2 Pitch Video.
		cy.get('owl-stage.ng-tns-c221-6 > :nth-child(1) > .owl-stage > .active > .slider-box')
			.click()
		
		// * Compare Pitches.
		cy.get('.box-center > button')
			.click()

		cy.wait(3000)

		// * Check the URL.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('user/compare/details')
		})
	})

	// * Share report.
	it('should share the report', () => {

		cy.wait(2000)

		// * Get the Share Button.
		cy.get('.top-links > .icon-btn > a')
			.click()

	})
})