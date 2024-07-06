"use client";
import { useState } from "react";
import { ContactIcon, EmailIconContact, PhoneIconContact, ZaloIconContact } from "./icons";
import Link from "next/link";

function MenuContact() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="fixed right-10 bottom-16 z-10 cursor-pointer">
      <div className={"wrap-contact-icon"}>
        <div className={"contact-icon"} onClick={() => setShowMenu(!showMenu)}>
          <ContactIcon />
        </div>
      </div>

      <div className={` flex flex-col  menu-contact  ${showMenu ? "" : "hidden"}`}>
        <Link href="tel:+0763948610" className={"contact-item"}>
          <PhoneIconContact />
          <div> Cần tư vấn gọi ngay qua hotline 0763948610 </div>
          <div></div>
        </Link>
        <Link href="https://zalo.me/0763948610" target="_blank" rel="noreferrer" className={"contact-item"}>
          <ZaloIconContact />
          Chat với chúng tôi qua zalo
        </Link>
        <Link href="mailto:ngvietquannro@gmail.com" className={"contact-item"}>
          <EmailIconContact />
          Email
        </Link>
      </div>
    </div>
  );
}

export default MenuContact;
