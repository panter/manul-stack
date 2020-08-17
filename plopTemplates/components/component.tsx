import React from "react";
import styled from "styled-components";

const Base = styled.div`

`;

export type {{name}}Props = {
    style?: React.CSSProperties;
    className?: string;
}

const {{name}}: React.FC<{{name}}Props> = ({style, className}) => {
  return (
    <Base style={style} className={className}>
        <p>{{name}}</p>
    </Base>
  );
}

export default {{name}};
