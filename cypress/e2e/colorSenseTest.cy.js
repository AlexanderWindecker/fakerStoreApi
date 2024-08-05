describe('Color Clicker', () => {
  beforeEach(() => {
    cy.visit('https://zzzscore.com/color/en/')
  })

  it('Clicks on the color as many times as possible in 60 seconds', () => {
    const startTime = new Date().getTime()
    let clicks = 0

    function clickColor() {
      cy.get('.main').as('main')
      cy.get('@main').click().then(() => {
        clicks++
        if (new Date().getTime() - startTime < 60000) {
          clickColor()
        } else {
          cy.get('.level').invoke('text').then((num) =>{
            cy.log(`Clicked ${num}`)
          })
        }
      })
    }

    clickColor()
  })
})