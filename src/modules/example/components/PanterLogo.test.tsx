import "jest";
import { shallow } from "enzyme";
import PanterLogo from "./PanterLogo";

describe("PanterLogo", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<PanterLogo />);
    expect(wrapper.find(<svg />)).toBeTruthy();
  });
});
