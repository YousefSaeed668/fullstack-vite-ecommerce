import { styles } from "../styles";
import Logo from "./Logo";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const columns = [
  {
    title: "INFORMATION",
    links: [
      "About Us",
      "Delivery Information",
      "Privacy Policy",
      "Terms & Conditions",
      "Contact Us",
    ],
  },
  {
    title: "CUSTOMER CARE",
    links: [
      "Payment Methods",
      "Money-back Guarantee!",
      "Returns",
      "Shipping",
      "Privacy Policy",
    ],
  },
];

const Icons = [<IoHomeOutline />, <IoIosPhonePortrait />, <CiMail />];
function Footer() {
  return (
    <footer className="bg-[#fafafa] py-5 border-t ">
      <div
        className={`${styles.container} grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-grey-600`}
      >
        <div className="flex-1 text-center  min-w-[280px]">
          <Logo />
          <p className="">
            LOGANCEE: Elevate your style with curated, high-quality products.
            Your go-to for fashion, tech, and more. Shop now!"
          </p>
        </div>
        {columns.map((column, index) => (
          <div key={column.title} className="flex-1  min-w-[280px]">
            <h3 className="text-black font-semibold text-lg">{column.title}</h3>
            <ul
              className={`ml-3 mt-4 text-sm ${index === 2 ? " " : "list-disc"}`}
            >
              {column.links.map((link) => (
                <li key={link} className="mt-2">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-black font-semibold text-lg">GET IN TOUCH</h3>
          <ul className="ml-3 mt-4 text-sm ">
            <li className="mt-2 flex gap-2 items-center">
              {" "}
              <IoHomeOutline size={18} /> Address: 123 Street Name, City,
              England
            </li>
            <li className="mt-2  flex gap-2 items-center">
              <IoIosPhonePortrait size={18} /> Phone: (123) 456-7890
            </li>
            <li className="mt-2 flex gap-2 items-center">
              <CiMail size={18} /> Email: info@example.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
