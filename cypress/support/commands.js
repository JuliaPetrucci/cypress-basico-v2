Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.visit('src/index.html')
    cy.get('#firstName').type('Julia')
    cy.get('#lastName').type('Petrucci')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Testando.')
    cy.contains('button', 'Enviar').click()
})