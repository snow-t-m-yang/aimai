import { LucideProps, UserPlus } from "lucide-react";

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg
      {...props}
      width="50"
      height="50"
      viewBox="0 0 179 196"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_13_89)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M113.459 1L43.8555 183H109.435L178.855 1.47877L178.201 1H113.459Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 54H152.855V1H38.4051L14 54Z"
          fill="white"
        />
        <path
          d="M31.5866 51H21.7003L44.0085 7.36364H55.8977L63.696 51H53.8097L48.5043 17.3352H48.1634L31.5866 51ZM33.8452 33.848H57.1974L55.9616 41.0497H32.6094L33.8452 33.848ZM83.9183 7.36364L76.674 51H67.4482L74.6925 7.36364H83.9183ZM107.203 25.581L106.032 32.7827H86.1097L87.2816 25.581H107.203Z"
          fill="#FF7788"
        />
        <path
          d="M116.634 7.36364H128.012L135.192 36.6818H135.703L152.557 7.36364H163.935L156.691 51H147.742L152.472 22.598H152.088L136.151 50.7869H130.036L123.473 22.4915H123.111L118.338 51H109.39L116.634 7.36364Z"
          fill="#A09C9C"
        />
        <path
          d="M97.6491 110H87.7628L110.071 66.3636H121.96L129.759 110H119.872L114.567 76.3352H114.226L97.6491 110ZM99.9077 92.848H123.26L122.024 100.05H98.6719L99.9077 92.848ZM90.0824 122.364L82.8381 166H73.6122L80.8565 122.364H90.0824Z"
          fill="#A09C9C"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_13_89"
          x="0"
          y="0"
          width="178.855"
          height="196"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset
            dx="-7"
            dy="6"
          />
          <feGaussianBlur stdDeviation="3.5" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_13_89"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_13_89"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  UserPlus,
};

export type Icon = keyof typeof Icons;
