import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white p-5 xl:p-20  bottom-0 w-full">
      <div className="flex items-start justify-between flex-wrap gap-10">
        <div>
          <Image
            src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/logo.svg"
            alt="sd"
            width={10}
            height={10}
            className="w-56 h-full"
          />
          <p className="text-slate-500 max-w-xs text-sm mt-5">
            Hendrerit dolor magna eget est lorem ipsum dolor sit. Dolor morbi
            non arcu risus quis. Lorem ipsum dolor sit amet consectetur
            adipiscing elit. Fames ac turpis egestas integer eget.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Information</h2>
          <ul className="text-slate-500 flex flex-col gap-3 text-sm">
            <li>
              <Link href="">About Us</Link>
            </li>
            <li>
              <Link href="">FAQs</Link>
            </li>{" "}
            <li>
              <Link href="">Find a Pharmacy</Link>
            </li>
            <li>
              <Link href="">Careers</Link>
            </li>
            <li>
              <Link href="">Contact Us</Link>
            </li>
            <li>
              <Link href="">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Customer Care</h2>
          <ul className="text-slate-500 flex flex-col gap-3 text-sm">
            <li>
              <Link href="">About Us</Link>
            </li>
            <li>
              <Link href="">FAQs</Link>
            </li>{" "}
            <li>
              <Link href="">Find a Pharmacy</Link>
            </li>
            <li>
              <Link href="">Careers</Link>
            </li>
            <li>
              <Link href="">Contact Us</Link>
            </li>
            <li>
              <Link href="">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Helpful Links</h2>
          <ul className="text-slate-500 flex flex-col gap-3 text-sm">
            <li>
              <Link href="">About Us</Link>
            </li>
            <li>
              <Link href="">FAQs</Link>
            </li>{" "}
            <li>
              <Link href="">Find a Pharmacy</Link>
            </li>
            <li>
              <Link href="">Careers</Link>
            </li>
            <li>
              <Link href="">Contact Us</Link>
            </li>
            <li>
              <Link href="">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <small>Copyright © 2024 Pharmacy. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
