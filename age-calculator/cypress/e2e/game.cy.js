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
    mockAnswer();
    cy.visit("http://localhost:3000");
    modifySliderValue(".ant-slider-handle-2", "{leftarrow}", 5);
    modifySliderValue(".ant-slider-handle-1", "{rightarrow}", 5);
  });

  it("The user can see the sliders ", () => {
    mockAnswer();
    cy.visit("http://localhost:3000");

    modifySliderValue(".ant-slider-handle-2", "{leftarrow}", 5);
    cy.findByText("95").should("exist");
    modifySliderValue(".ant-slider-handle-1", "{rightarrow}", 5);
    cy.findByText("5").should("exist");
  });

  it("When user clicks on the next button, the current slider is disabled", () => {
    mockAnswer();
    cy.visit("http://localhost:3000");

    cy.findByTestId("buttonNext").click();
    cy.get(".ant-slider-disabled").should("exist");
  });

  it("When user clicks on the next button, a new slider appears", () => {
    mockAnswer();
    cy.visit("http://localhost:3000");

    cy.findByTestId("slider-1").should("exist");
    cy.findByTestId("slider-2").should("not.exist");

    cy.findByTestId("buttonNext").click();

    cy.findByTestId("slider-2").should("exist");
  });

  it("When user clicks more than 5 times the next button, a new slider doesn't appears", () => {
    mockAnswer();
    cy.visit("http://localhost:3000");

    cy.findByTestId("buttonNext").click();

    clickNextButton(5);
    cy.findByTestId("slider-6").should("not.exist");
  });

  it("The user should see an input to guess the age", () => {
    mockAnswer();
    cy.visit("http://localhost:3000");

    cy.findByTestId("guess-input").should("exist");
  });

  it("the slider should turn yellow if the age is between the solution", () => {
    mockAnswer();

    cy.visit("http://localhost:3000");
    // cy.wait(2000);
    cy.findByText("🟡").should("not.exist");
    cy.findByTestId("buttonNext").click();
    cy.findByText("🟡").should("exist");
  });

  it("the slider should turn red if the age is not between the solution", () => {
    mockAnswer();

    cy.visit("http://localhost:3000");

    cy.findByText("🔴").should("not.exist");
    modifySliderValue(".ant-slider-handle-1", "{rightarrow}", 1);
    cy.findByTestId("buttonNext").click();
    cy.findByText("🔴").should("exist");
  });
});

function mockAnswer() {
  cy.intercept("GET", "http://localhost:8080/api/person", {
    statusCode: 200,
    body: {
      image:
        "https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/Purina%C2%AE%20La%20llegada%20del%20gatito%20a%20casa.jpg?itok=_3VnSPSl",
      name: "Monxeta",
      age: 0,
    },
  }).as("getPerson");
}

function clickNextButton(times) {
  for (let i = 0; i < times; i++) {
    cy.findByTestId("slider-" + (i + 1)).should("exist");
    cy.findByTestId("buttonNext").click();
  }
}

function modifySliderValue(slider, movement, times) {
  for (let i = 0; i < times; i++) {
    cy.get(".ant-slider").find(slider).type(movement);
  }
}
