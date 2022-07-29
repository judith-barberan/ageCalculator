describe("When the user start to play the game", () => {
  it("should see an image", () => {
    cy.visit("http://localhost:3000");
    cy.findByTestId("personImage").should("exist");
  });

  it("The user should see a title", () => {
    cy.visit("http://localhost:3000");
    cy.findByText("How old is he/she?").should("exist");
  });

  it("The user should see a slider", () => {
    cy.visit("http://localhost:3000");
    cy.findByTestId("slider-1").should("exist");
  });

  it("The user should see a button to submit the answer", () => {
    cy.visit("http://localhost:3000");
    cy.findByTestId("buttonNext").should("exist");
  });

  it("The user can modify the slider value", () => {
    cy.visit("http://localhost:3000");
    modifySliderValue(".ant-slider-handle-2", "{leftarrow}", 5);
    modifySliderValue(".ant-slider-handle-1", "{rightarrow}", 5);
  });

  it("The user can modify the slider value", () => {
    cy.visit("http://localhost:3000");
    modifySliderValue(".ant-slider-handle-2", "{leftarrow}", 5);
    cy.findByText("95").should("exist");
    modifySliderValue(".ant-slider-handle-1", "{rightarrow}", 5);
    cy.findByText("5").should("exist");
  });

  it("When user clicks on the next button, the current slider is disabled", () => {
    cy.visit("http://localhost:3000");
    cy.findByTestId("buttonNext").click();
    cy.get(".ant-slider-disabled").should("exist");
  });

  it("When user clicks on the next button, a new slider appears", () => {
    cy.visit("http://localhost:3000");
    cy.findByTestId("slider-1").should("exist");
    cy.findByTestId("slider-2").should("not.exist");

    cy.findByTestId("buttonNext").click();

    cy.findByTestId("slider-2").should("exist");
  });

  it("When user clicks more than 5 times the next button, a new slider doesn't appears", () => {
    cy.visit("http://localhost:3000");
    cy.findByTestId("buttonNext").click();

    clickNextButton(5);
    cy.findByTestId("slider-6").should("not.exist");
  });
});

function clickNextButton(times) {
  for (let i = 0; i < times; i++) {
    cy.findByTestId("slider-" + (i + 1)).should("exist");
    cy.findByTestId("buttonNext").click();
  }
}

function modifySliderValue(slider, movement, times) {
  for (let i = 0; i < times; i++) {
    cy.get(slider).type(movement);
  }
}
