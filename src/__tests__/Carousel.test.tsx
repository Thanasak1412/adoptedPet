import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("lets users click on the thumbnails to make them the hero", async () => {
  const images = ["1.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;
  expect(hero.src).toContain(images[0]);

  for (const [index, image] of images.entries()) {
    const thumb = (await carousel.findByTestId(
      `thumbnail${index}`
    )) as HTMLImageElement;

    thumb.click();

    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");

    carousel.unmount();
  }
});
