import { faker } from "@faker-js/faker";

describe("Fake Store API", () => {
  const url = "https://fakestoreapi.com/products";
  it("Get all products", () => {
    cy.api("GET", `${url}`).its("status").should("equal", 200);
  });

  it("Get a random product", () => {
    cy.api("GET", `${url}`).then((response) => {
      expect(response.status).to.eq(200);

      const i = response.body;

      const randomProduct = Cypress._.random(0, i.length - 1);
      const randomId = i[randomProduct].id;
      cy.api(`GET`, `${url}/${randomId}`).its("status").should("equal", 200);
    });
  });
  it("Add new Product", () => {
    const randomName = faker.person.fullName();
    const firstRandom = faker.number.float({ max: 100, precision: 0.01 });
    const descriptionRandom = faker.person.jobDescriptor();
    const categoryRandom = faker.person.jobType();
    const newProduct = {
      title: randomName,
      price: firstRandom,
      description: descriptionRandom,
      image: "https://i.pravatar.cc",
      category: categoryRandom,
    };
    cy.api("POST", `${url}`, newProduct).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.have.property("id");
      expect(response.body.title).to.equal(newProduct.title);
      expect(response.body.price).to.equal(newProduct.price);
      expect(response.body.description).to.equal(newProduct.description);
      expect(response.body.image).to.equal(newProduct.image);
      expect(response.body.category).to.equal(newProduct.category);
    });
  });
  it("Uptade a Product", () => {
    cy.api("GET", `${url}`).then((response) => {
      expect(response.status).to.equal(200);
      const products = response.body;

      const productId = Cypress._.random(0, products.length - 1);
      const randomProduct = products[productId];

      const upProducts = {
        title: "Actualizamos el producto",
        price: 100,
        description: "Updated Description",
        image: "https://i.pravatar.cc",
        category: "Updated Category",
      };
      cy.api("PUT", `${url}/${randomProduct.id}`, upProducts).then(
        (response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property("id", randomProduct.id);
          expect(response.body.title).to.equal(upProducts.title);
          expect(response.body.price).to.equal(upProducts.price);
          expect(response.body.description).to.equal(upProducts.description);
          expect(response.body.image).to.equal(upProducts.image);
          expect(response.body.category).to.equal(upProducts.category);
        }
      );
    });
  });
  it("Delete a product", () => {
    cy.api("GET", `${url}`).then((response) => {
      expect(response.status).to.eq(200);

      const delProduct = response.body;
      const delRandom = Cypress._.random(0, delProduct.length - 1);
      const delId = delProduct[delRandom].id;

      cy.api("DELETE", `${url}/${delId}`);
    });
  });
});
