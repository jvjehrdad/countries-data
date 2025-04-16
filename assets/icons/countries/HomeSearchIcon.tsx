import React from 'react';

interface Props {
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const HomeSearchIcon: React.FC<Props> = ({
  color = '#FAF5FA',
  style,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    style={style}
    onClick={onClick}
  >
    <path
      opacity="0.5"
      d="M27.0845 14.8755C27.0845 21.6183 21.6183 27.0844 14.8755 27.0844C8.13283 27.0844 2.66675 21.6183 2.66675 14.8755C2.66675 8.13277 8.13283 2.66669 14.8755 2.66669C21.6183 2.66669 27.0845 8.13277 27.0845 14.8755Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.1182 25.1183C25.4946 24.7419 26.1049 24.7419 26.4813 25.1183L29.0516 27.6886C29.428 28.065 29.428 28.6752 29.0516 29.0516C28.6752 29.428 28.0649 29.428 27.6885 29.0516L25.1182 26.4814C24.7418 26.105 24.7418 25.4947 25.1182 25.1183Z"
      fill={color}
    />
  </svg>
);

export default HomeSearchIcon;
