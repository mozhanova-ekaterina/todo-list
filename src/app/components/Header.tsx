import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], style: "italic" });

export default function Header() {
  return (
    <div className="flex py-5 justify-between items-end">
      <Logo />
      {/* <UiButton onClick={() => setIsAdding(true)} icon={<CheckIcon />}>
        Новая задача
      </UiButton> */}
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-end">
      <span className="font-bold text-primary text-lg">TODO</span>{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 24 24"
        className="animate-spin-slow"
      >
        <path
          fill="currentColor"
          d="m14.05 16.242l-1.065-1.046q-.146-.146-.347-.158t-.367.153t-.165.356q0 .192.165.357l1.213 1.213q.243.243.566.243t.566-.243l3.344-3.363q.146-.146.153-.344q.006-.198-.16-.368q-.164-.155-.353-.158t-.354.162zM8 14.5h1q.213 0 .356-.144t.144-.357t-.144-.356T9 13.5H8q-.213 0-.356.144t-.144.357t.144.356T8 14.5m0-3h5q.213 0 .356-.144t.144-.357t-.144-.356T13 10.5H8q-.213 0-.356.144t-.144.357t.144.356T8 11.5m0-3h5q.213 0 .356-.144t.144-.357t-.144-.356T13 7.5H8q-.213 0-.356.144t-.144.357t.144.356T8 8.5M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
        />
      </svg>
      <span className={raleway.className}>list</span>
    </div>
  );
}
