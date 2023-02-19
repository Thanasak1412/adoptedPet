import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";

import Pet from "../Pet";
import { Animal } from "../APIResponseTypes";

test("Display a default thumbnail", async () => {
  const mockProps = {
    id: 1,
    name: "pug-kung",
    animal: "dog" as Animal,
    breed: "bulldog",
    images: ["none.jpg", "1.jpg", "2.jpg"],
    city: "Henderson",
    state: "Nevada",
  };
  const pet = render(
    <StaticRouter location="pathname">
      <Pet
        animal={mockProps.animal}
        name={mockProps.name}
        breed={mockProps.breed}
        images={mockProps.images}
        location={`${mockProps.city}, ${mockProps.state}`}
        id={mockProps.id}
      />
    </StaticRouter>
  );
  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;

  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("Display a non-default thumbnail", async () => {
  const mockProps = {
    id: 1,
    name: "pug-kung",
    animal: "dog" as Animal,
    breed: "bulldog",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    city: "Henderson",
    state: "Nevada",
  };
  const pet = render(
    <StaticRouter location="pathname">
      <Pet
        animal={mockProps.animal}
        name={mockProps.name}
        breed={mockProps.breed}
        images={mockProps.images}
        location={`${mockProps.city}, ${mockProps.state}`}
        id={mockProps.id}
      />
    </StaticRouter>
  );
  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;

  expect(petThumbnail.src).toContain("1.jpg");
});
