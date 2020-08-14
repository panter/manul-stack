import styled from "styled-components";
import PanterLogo from "../modules/example/components/PanterLogo";
import Heading from "../modules/layout/components/Heading";

const ManulStackImg = styled.img.attrs({
  src: "https://i.imgur.com/kwp7cRt.jpg",
})`
  width: 180px;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
  padding: 20px;
`;
export default function Home() {
  return (
    <Base>
      <a rel="noreferrer" target="_blank" href="https://www.panter.ch">
        <PanterLogo
          css={`
            width: 180px;
          `}
        />
      </a>
      <Heading>Manul stack</Heading>
      <ManulStackImg />
    </Base>
  );
}
