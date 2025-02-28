import { Mimetype } from "../mimetype";

it("should throw an error if the input is not a string", () => {
  try {
    new Mimetype(123 as any);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should throw an error if the mimetype is not accepted", () => {
  try {
    new Mimetype("text/html");
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should create a mimetype", () => {
  const mimetype = new Mimetype("image/png");
  expect(mimetype.getValue()).toEqual("image/png");
});

it("should get the correct extension by mimetype", () => {
  const mimetype = new Mimetype("image/png");
  expect(mimetype.getExtension()).toEqual("png");
});
