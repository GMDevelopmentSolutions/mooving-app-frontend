import { FC, SVGProps } from 'react';

interface SpriteSVGProps extends SVGProps<SVGSVGElement> {
  href: string;
  color?: string;
}

const SpriteSVG: FC<SpriteSVGProps> = ({
  href,
  width,
  height,
  color,
  ...props
}) => {
  return (
    <svg {...props} width={width || 24} height={height || 24}>
      <use href={`/img/sprite.svg#${href}`} style={{ fill: color }}></use>
    </svg>
  );
};

export default SpriteSVG;
