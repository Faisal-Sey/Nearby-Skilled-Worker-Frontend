import {NextRouter, useRouter} from "next/router";
import { useSelector } from "react-redux";
import styles from "./style.module.scss";
import { navTabs } from "@/utils/data";
import type { RootState } from "@/redux/store";
import { getInitial } from "@/utils/helpers";
import {UserState} from "@/redux/slices/userSlice";
import { FaBars } from "react-icons/fa";

function Navbar(): JSX.Element {
  const router: NextRouter = useRouter();
  const user: UserState = useSelector((state: RootState) => state.user);

  return (
    <div className={`${styles.navbar} navbar-wrapper`}>
      <div>LOGO</div>
      <div>
        <ul className="flex justify-between">
          {navTabs.map((elt) => (
            <li
              key={elt.id}
              className={`${styles.navLink} ${elt.path === router.pathname ? 'active' : ''}`}
              onClick={() => router.push(elt.path)}
            >
              {elt.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.navProfileItem}>
        {/*<button type="button">Apply now</button>*/}
        <button className={styles.nameProfile}>{getInitial(user?.name)}</button>
        <span className="cursor-pointer"><FaBars /></span>
      </div>
    </div>
  );
}

export default Navbar;
