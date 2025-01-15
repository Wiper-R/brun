import { ComponentProps } from "react";

export default function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="18"
      viewBox="0 0 53 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.5232 3.00681V17H45.6752V10.28C45.6752 9.87995 45.7392 9.55195 45.8672 9.29595C46.0112 9.02395 46.2032 8.82395 46.4432 8.69595C46.6992 8.55195 46.9872 8.47995 47.3072 8.47995C47.8512 8.47995 48.2192 8.63995 48.4112 8.95995C48.6032 9.26395 48.6992 9.70395 48.6992 10.28V17H52.8512V9.65595C52.8512 8.75995 52.7312 8.00795 52.4912 7.39995C52.2512 6.77595 51.8592 6.30395 51.3152 5.98395C50.7712 5.66395 50.0192 5.50395 49.0592 5.50395C48.0992 5.50395 47.3232 5.71995 46.7312 6.15195C46.29 6.48283 45.938 6.89818 45.6752 7.398V4.24526L41.5232 3.00681ZM5.38403 9.99195V13.448H7.32803C7.79203 13.448 8.20803 13.4 8.57603 13.304C8.96003 13.208 9.26403 13.032 9.48803 12.776C9.71203 12.504 9.82403 12.12 9.82403 11.624C9.82403 11.304 9.76003 11.04 9.63203 10.832C9.50403 10.624 9.32003 10.456 9.08003 10.328C8.85603 10.2 8.59203 10.112 8.28803 10.064C8.00003 10.016 7.68003 9.99195 7.32803 9.99195H5.38403ZM11.3357 8.03089C11.7506 8.18508 12.1427 8.37477 12.512 8.59995C13.168 8.98395 13.688 9.48795 14.072 10.112C14.472 10.72 14.672 11.456 14.672 12.32C14.672 13.44 14.4 14.344 13.856 15.032C13.312 15.72 12.536 16.224 11.528 16.544C10.52 16.848 9.31203 17 7.90403 17H0.728027V0.199951H7.47203C8.67203 0.199951 9.73603 0.359951 10.664 0.679952C11.608 0.999952 12.352 1.47995 12.896 2.11995C13.44 2.74395 13.712 3.53595 13.712 4.49595C13.712 5.40795 13.44 6.19195 12.896 6.84795C12.4883 7.32766 11.9682 7.72197 11.3357 8.03089ZM5.38403 6.84795H6.89603C7.32803 6.84795 7.68803 6.78395 7.97603 6.65595C8.26403 6.52795 8.48003 6.34395 8.62403 6.10395C8.78403 5.86395 8.86403 5.57595 8.86403 5.23995C8.86403 4.72795 8.69603 4.35195 8.36003 4.11195C8.04003 3.87195 7.55203 3.75195 6.89603 3.75195H5.38403V6.84795ZM21.0635 7.36355V5.95995H17.0075V17H21.0635V11.936C21.0635 11.408 21.1355 10.968 21.2795 10.616C21.4395 10.264 21.6555 9.99995 21.9275 9.82395C22.1995 9.64795 22.4955 9.55995 22.8155 9.55995C23.1355 9.55995 23.3995 9.62395 23.6075 9.75195C23.8315 9.86395 24.0315 10.016 24.2075 10.208L25.9355 6.63195C25.7595 6.35995 25.4875 6.13595 25.1195 5.95995C24.7515 5.76795 24.3675 5.67195 23.9675 5.67195C23.3275 5.67195 22.7115 5.87995 22.1195 6.29595C21.7113 6.57947 21.3593 6.93534 21.0635 7.36355ZM33.0789 14.48C32.5509 14.48 32.1909 14.328 31.9989 14.024C31.8069 13.704 31.7109 13.256 31.7109 12.68V5.95995H27.3669V13.112C27.3669 14.424 27.6709 15.448 28.2789 16.184C28.8869 16.904 29.9109 17.264 31.3509 17.264C32.1829 17.264 32.8709 17.096 33.4149 16.76C33.9749 16.408 34.4149 15.944 34.7349 15.368V17H38.8869V5.95995H34.7349V12.68C34.7349 13.08 34.6629 13.416 34.5189 13.688C34.3909 13.96 34.2069 14.16 33.9669 14.288C33.7269 14.416 33.4309 14.48 33.0789 14.48Z"
        fill="currentColor"
      />
    </svg>
  );
}
