import { BsExclamationCircle } from "react-icons/bs";
import styles from "./style.module.scss";

function ToastBanner() {
  return ( 
    <div className={styles.toastBanner}>
      <div className={styles.toastContainer}>
        <span><BsExclamationCircle fill="#FFA500" size={30} /></span>
        <div className="ml-3">
          <p className="text-[#FFA500] font-bold">Verify Email Address</p>
          <span className="text-[13px]">
            Please check your email to follow instructions to verify your email address to receive latest update on gigs in
            your area.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ToastBanner;