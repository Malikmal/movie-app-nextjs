import { render, screen } from "@testing-library/react";
import Image, { IMAGE_NOT_FOUND_SRC } from "@/components/Image";

describe("Image Component", () => {
  it("Image Component Should render correctly ", () => {
    render(
      <Image
        src="/next.svg"
        alt="nextjs"
        width={0}
        height={0}
        sizes="100"
        className="w-full aspect-[16/9] object-cover object-center"
      />
    );

    const element = screen.getByTestId("image");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("src", "http://localhost/next.svg");
  });

});
