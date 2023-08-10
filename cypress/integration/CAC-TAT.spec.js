/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
})   
    it('verifica o título da aplicação', function() {
      cy.visit('src/index.html')
    cy.title().should('contains', 'Central de Atendimento ao Cliente TAT')
    })
 
   
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = Cypress._.repeat('Teste ', 20)
    cy.visit('src/index.html')
    cy.clock()
    cy.get('#firstName').type('Julia')
    cy.get('#lastName').type('Petrucci')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').invoke('val', longText)
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.visit('src/index.html')
    cy.clock()
    cy.get('#firstName').type('Julia')
    cy.get('#lastName').type('Petrucci')
    cy.get('#email').type('teste@teste,com')
    cy.get('#open-text-area').type('Testando.')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

  })

    it('campo telefone continua vazio quando preechido com um valor não numérico', function() {
    cy.visit('src/index.html')
    cy.get('#phone')
    .type('abcdefghijklmopqrstuvxz')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.visit('src/index.html')
    cy.clock()
    cy.get('#firstName').type('Julia')
    cy.get('#lastName').type('Petrucci')
    cy.get('#email').type('teste@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Testando.')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.visit('src/index.html')
    cy.get('#firstName').type('Julia').should('have.value', 'Julia').clear().should('have.value', '')
    cy.get('#lastName').type('Petrucci').should('have.value', 'Petrucci').clear().should('have.value', '')
    cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '')
    cy.get('#phone').type('11987654321').should('have.value', '11987654321').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.visit('src/index.html')
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.visit('src/index.html')
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.visit('src/index.html')
    cy.get('#product').select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.visit('src/index.html')
    cy.get('#product').select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function() {
    cy.visit('src/index.html')
    cy.get('#product').select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function() {
    cy.visit('src/index.html')
    cy.get('input[type="radio"]').check() 
    cy.get('input[value="feedback"]').check()
    .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function() {
    cy.visit('src/index.html')
    cy.get('input[type="radio"]').should('have.length', 3)
    .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.visit('src/index.html')
    cy.get('input[type="checkbox"]').check()
    .should('be.checked')
    .last().uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.visit('src/index.html')
    cy.get('#file-upload').should('not.have.value')
     .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' } ) 
     .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo da pasta fixtures', function() {
    cy.visit('src/index.html')
    cy.get('#file-upload').should('not.have.value')
     .selectFile('./cypress/fixtures/example.json')
     .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.visit('src/index.html')
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload').should('not.have.value')
    .selectFile('@sampleFile')
    .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
    })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.visit('src/index.html')
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.visit('src/index.html')
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function()  {
    cy.visit('src/index.html')
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function() {
    const longText = Cypress._.repeat('0123456789', 20)
    cy.visit('src/index.html')
    cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText)
  })

    it('faz uma requisição HTTP', function()  {
      cy.request({
        method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
      }).should(function(response) {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK')
        expect(response.body).contains('CAC TAT')
      })
    })

    it('encontre o gato', function() {
      cy.visit('src/index.html')
      cy.get('#cat').should('not.be.visible')
      .invoke('show').should('be.visible')
      cy.get('#title').invoke('text', 'CAT TAT')
      cy.get('#subtitle').invoke('text', 'Gatos são os maiorais!')
    })










