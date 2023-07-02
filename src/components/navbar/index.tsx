import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./style.module.scss";
import { navTabs } from "../../utils/data";
import type { RootState } from "@/redux/store";
import { getInitial } from "../../utils/helpers";

function Navbar() {
  const router = useRouter();
  // Retrieve user from redux store
  const user = useSelector((state: RootState) => state.user);

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
      <div className={styles.navProfileItem}>
        <button type="button">Apply now</button>
        <button type="button">Sign up</button>
        <button>{getInitial(user?.name)}</button>
        <span>Three bars</span>
      </div>
    </div>
  );
}

export default Navbar;
