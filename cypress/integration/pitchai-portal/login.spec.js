/// <reference types="cypress" />

import {userEmail, userPassword} from '../../../config'

context('User Registration', () => {

	beforeEach(() => {
		cy.restoreLocalStorage()
	})

	afterEach(() => {
		cy.saveLocalStorage() 
	})

	// * Opens the Application's Home page
	it('Navigates to application home page', () => {
		cy.log('Opening PitchAI-Portal Home Page')

		// * Opens the App land page.
		cy.visit('https://fe-test.proplayai.com/')

		// * After Visting the app land page, check the URL contains expected keywords.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('proplayai')
		})

		// * Check if the home page has the <h1> which contains the login, if it does then test is successfull.
		cy.get('h1').contains('Login')
			.then(() => {
				cy.log('Navigated To Home Page')
			})
	})

	// * Navigates to the Application's Registration Page.
	it('Navigates to Registration Page', () => {
		cy.log('Navigating to the Registation Page ...')

		// * Get the Registation Link.
		cy.get('p > a').contains('register now').click()

		// * Checks whether the URL contains the register keyword or not.
		cy.location().should((loc) => {
			expect(loc.href).to.contain('register')
		})

		// * Gets the Registration Brand Title, and confirms if the registration page is loaded or not.
		cy.get('.registration-brand > p').contains('PitchAI Access').then(() => {
			cy.log('Navigated To registration page')
		})
	})


	// * Uses the Fake credentials, to check the actions of the app.
	it('should not login to the application', () => {

		// * Opens the Login Page/ Application's home page
		cy.visit('https://fe-test.proplayai.com/')

		// * Get the Email Input Field and type the email address.
		cy.get('input[formcontrolname="userNameOrEmailAddress"]')
			.type('loginthisuser@express.com')
		
		// * Get the Password Input field and type the password.
		cy.get('input[formcontrolname="password"]')
			.type('thisisawrongpassword')
		
		// * Click on the Login button.
		cy.get('button[type=submit]')
			.click()

		// * Wait for API calls to return with the results.
		cy.wait(7000)

		// * Checks if the URL changed, although credentials were wrong.
		cy.location().should((loc) => {
			expect(loc.href).not.to.contain('user/dashboard')
		})
		
	})

	// * Logins the User and redirects to the Dashboard.
	it('should login and redirect to the dashboard', () => {

		// * Reload the page, to remove previous fake credentials.
		cy.reload()

		// * Get the Email Input Field and type the email address.
		cy.get('input[formcontrolname="userNameOrEmailAddress"]')
			.type(userEmail, {delay:100})
			.should('have.value', userEmail)
		
		// * Get the Password Input field and type the password.
		cy.get('input[formcontrolname="password"]')
			.type(userPassword, {delay:100})
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

	// * Logouts the current logged in user and Redirect to Home Page.
	it('should logout the current logged in user', () => {

		cy.wait(2000)

		//* Click on the Dropdown menu, to get the logout option.
		cy.get('.mat-menu-trigger')
			.click()
		
		// * Gets the Logout Button and performs a click.
		cy.get('.mat-menu-content > :nth-child(2)')
			.contains('Log out')
			.click()

		cy.wait(2000)
		
		// * Check If you're successfully logged out or not by checking the URL.
		cy.location().should((loc) => {
			expect(loc.href).to.eq('https://fe-test.proplayai.com/')
		})
	})

})