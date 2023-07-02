import styles from "./style.module.scss";

function Footer() {
  return ( 
    <div className="bg-[#FEF8F3]">
      <div className={styles.footer}>
        <div className="flex justify-between flex-col">
          <div className="flex flex-col">
            <span>LOGO</span>
            <span>A text about Gigs Platform</span>
          </div>
        </div>
        <div className="flex m-3 flex-col justify-between">
          <span className="uppercase">Pages</span>
          <div className="flex flex-col">
            <span>Home</span>
            <span>Gigs</span>
          </div>
        </div>
        <div className="flex m-3 flex-col justify-between">
          <span className="uppercase">Company</span>
          <div className="flex flex-col">
            <span>About</span>
            <span>Team</span>
            <span>Reviews</span>
          </div>
        </div>      
        <div className="flex m-3 flex-col justify-between">
          <span className="uppercase">Support</span>
          <div className="flex flex-col">
            <span>Privacy</span>
            <span>Terms & Conditions</span>
            <span>FAQ</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <span className="pb-3">Copyright 2023</span>
      </div>
    </div>
  );
}

export default Footer;