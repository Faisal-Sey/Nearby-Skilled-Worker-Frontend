import Image from "next/image";
import styles from "./style.module.scss";
import ImageTemp from "@/assets/images/tour-main.webp";
import Avatar from "@/assets/images/person-img.png";
import { BsClock, BsGeoAlt } from "react-icons/bs";

function GigCard() {
  return (
    <div className={styles.gigCard}>
      <div>
        <Image
          src={ImageTemp}
          alt="gig-image"
          className={styles.gigCardImage}
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex mb-3 items-center">
            <div>
              <Image src={Avatar} alt="" className="w-[40px] h-[40px]" />
            </div>
            <div className="ml-2">
              <span>Test Avatar</span>
            </div>
          </div>
          <span className="bg-[#FEF8F3] p-2 rounded-md">Marketing</span>
        </div>
        <h1 className="font-bold text-[24px]">Plumber needed nearby</h1>
        <div className="flex mt-3">
          <span className="flex items-center">
            <BsClock />
            <span className="ml-2">3 days ago</span>
          </span>
          <span className="flex ml-3 items-center">
            <BsGeoAlt />
            <span className="ml-2">Kumasi</span>
          </span>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <span className="text-[24px] font-bold">GHC 500</span>
          <span>3 bids submitted</span>
        </div>
      </div>
    </div>
  );
}

export default GigCard;
