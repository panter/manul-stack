import React from "react";
import styled from "styled-components";

import Rectangle from "react-rectangle";
import usePreventOnClickInEditor from "../../reactPage/hooks/usePreventOnClickInEditor";
export const ASPECT_RATIOS = ["auto", "16/9", "4/3"] as const;
export type AspectRatio = typeof ASPECT_RATIOS[number];

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const BoxedImg = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

export type ImageProps = {
  imageUrl: string;
  externalUrl?: string;
  aspectRatio?: AspectRatio;
  crop?: boolean;
  maxWidth?: number;
  align?: "left" | "center" | "right";
  altText?: string;
};

type FullImageProps = {
  style?: React.CSSProperties;
  className?: string;
} & ImageProps;
const Image: React.FC<FullImageProps> = ({
  imageUrl,
  altText,
  externalUrl,
  aspectRatio = "auto",
  crop = true,
  maxWidth,
  align,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    ...(maxWidth ? { maxWidth } : {}),
    display: "block",
    ...(align === "right"
      ? { marginLeft: "auto" }
      : align === "center"
      ? { marginLeft: "auto", marginRight: "auto" }
      : {}),
  };
  const image =
    aspectRatio === "auto" ? (
      <Img alt={altText} src={imageUrl} style={baseStyle} />
    ) : (
      <Rectangle aspectRatio={aspectRatio.split("/")} style={baseStyle}>
        <BoxedImg
          style={{
            backgroundSize: crop ? "cover" : "contain",
            backgroundImage: `url("${imageUrl}")`,
          }}
        />
      </Rectangle>
    );
  const onClick = usePreventOnClickInEditor();
  return externalUrl ? (
    <a
      onClick={onClick}
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {image}
    </a>
  ) : (
    image
  );
};

export default Image;
