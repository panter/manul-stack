import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  height: 52px;
  width: 152px;
`;

export type PanterLogoProps = {
  style?: {};
  className?: string;
};

const PanterLogo: React.FC<PanterLogoProps> = ({ style, className }) => (
  <SVG style={style} className={className} fill="none" viewBox="0 0 152 53">
    <path
      fill="#595959"
      d="M36.18 31.346H0l6.003-10.467 6.057-10.413L18.064 0l6.056 10.466 6.004 10.413 6.056 10.467z"
    />
    <path
      fill="#1A1A1A"
      d="M24.12 31.346H0l12.06-20.88 6.004 10.413 6.056 10.467z"
    />
    <path fill="#333" d="M24.12 31.346H0l18.064-10.467 6.056 10.467z" />
    <path
      fill="#1A1A1A"
      d="M36.18 52.225l-6.056-10.52-6.004-10.36 6.004-10.466 6.056 10.467 6.004 10.36-6.004 10.52z"
    />
    <path fill="#333" d="M36.18 31.346l-6.056 10.36h12.06l-6.004-10.36z" />
    <path
      fill="#52C3F1"
      d="M54.244 20.88h-24.12l12.06 20.826 6.003-10.36 6.057-10.467z"
    />
    <path
      fill="#000"
      d="M66.623 23.058h2.922v.956c1.063-.797 2.338-1.222 3.825-1.222 2.02 0 3.772.69 5.207 2.019 1.434 1.328 2.125 2.975 2.125 4.888 0 1.222-.319 2.39-.956 3.453a6.682 6.682 0 01-2.657 2.497c-1.115.638-2.337.903-3.719.903-1.487 0-2.762-.425-3.825-1.222v7.863h-3.56V23.642c-.053-.266.266-.584.638-.584zm4.09 9.244c.745.69 1.648 1.01 2.657 1.01 1.063 0 1.913-.372 2.71-1.063.744-.69 1.115-1.54 1.115-2.55 0-.957-.371-1.807-1.115-2.55a3.86 3.86 0 00-2.71-1.063c-1.01 0-1.912.319-2.656 1.01-.744.69-1.116 1.487-1.169 2.443v.32c0 .955.425 1.752 1.169 2.443zM84.58 24.81c1.435-1.327 3.135-2.018 5.207-2.018 1.487 0 2.762.425 3.825 1.222v-.319c0-.372.319-.637.638-.637h2.922v13.175h-3.56v-.85c-1.063.797-2.338 1.222-3.825 1.222-1.328 0-2.55-.318-3.72-.903-1.115-.637-2.018-1.434-2.656-2.497a6.638 6.638 0 01-.956-3.453c0-1.966.69-3.56 2.125-4.941zm2.497 7.439a3.86 3.86 0 002.71 1.062 3.86 3.86 0 002.71-1.062c.743-.69 1.115-1.54 1.115-2.55 0-1.222-.584-2.179-1.7-3.029-.372-.265-.797-.425-1.275-.53-1.435-.267-2.603.105-3.56 1.008-.744.691-1.115 1.541-1.115 2.55 0 1.01.371 1.86 1.115 2.55zM101.262 23.058h2.922v.956c.372-.266.638-.425.904-.584.265-.16.637-.266 1.115-.425.478-.16 1.063-.213 1.647-.213.797 0 1.488.106 2.179.319.637.212 1.275.584 1.806 1.01.531.424.956 1.062 1.222 1.806.319.743.425 1.646.425 2.656v7.597h-3.56v-7.013c0-2.072-.956-3.134-2.869-3.134-1.912 0-2.869 1.01-2.869 3.081v7.066h-3.559V23.642c-.053-.266.265-.584.637-.584zM115.448 23.058h2.178v-3.826c0-.372.319-.637.638-.637h2.922v4.463h3.665v3.294h-3.665v5.26c0 1.168.531 1.752 1.54 1.752.266 0 .532 0 .85-.053.266 0 .532-.053.691-.053l.266-.053v3.028c-.691.213-1.647.32-2.763.32-1.328 0-2.338-.373-3.028-1.17-.691-.744-1.063-1.806-1.063-3.134v-6.004h-2.178l-.053-3.188zM143.765 23.058h2.922v.956a5.478 5.478 0 012.125-.956c.744-.16 1.807-.266 3.188-.266v3.24c-.903 0-1.647.054-2.285.16-.637.107-1.168.213-1.54.425-.372.16-.691.425-.903.744-.213.319-.372.638-.425.956a7.356 7.356 0 00-.107 1.222v6.641h-3.612V23.642c0-.266.318-.584.637-.584zM127.03 27.148a6.192 6.192 0 011.434-2.23c.585-.638 1.381-1.117 2.285-1.542a7.813 7.813 0 012.975-.584c1.328 0 2.55.319 3.613.956 1.062.638 1.912 1.488 2.497 2.497.584 1.063.903 2.179.903 3.4 0 .372-.053 1.01-.106 1.329h-10.414c.319.744 1.169 2.497 3.772 2.497a4.9 4.9 0 001.913-.372c.585-.266 1.116-.584 1.488-1.116l2.444 1.86c-.638.85-1.435 1.487-2.497 1.965-1.01.479-2.126.691-3.348.691a7.858 7.858 0 01-3.719-.903 6.949 6.949 0 01-2.656-2.444 6.508 6.508 0 01-.956-3.453c-.106-.85.053-1.7.372-2.55zm9.988.904c-.213-.638-1.01-2.125-3.347-2.125-2.179 0-3.135 1.434-3.454 2.125h6.801z"
    />
  </SVG>
);

export default PanterLogo;