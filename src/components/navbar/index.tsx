import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { navTabs } from "../../utils/data";

function Navbar() {
  const router = useRouter();

  return (
    <div className={`${styles.navbar} navbar-wrapper`}>
      <div>LOGO</div>
      <div>
        <ul className="flex justify-between">
          {navTabs.map((elt) => (
            <li
              key={elt.id}
              className={styles.navLink}
              onClick={() => router.push(elt.path)}
            >
              {elt.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button type="button">Apply now</button>
        <button type="button">Sign up</button>
        <span>Three bars</span>
      </div>
    </div>
  );
}

export default Navbar;
