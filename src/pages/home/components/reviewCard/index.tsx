import Image from "next/image";
import Avatar from "@/assets/images/person-img.png";
import styles from "./style.module.scss";

function ReviewCard() {
  return ( 
    <div className={styles.reviewCard}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src={Avatar} alt="" className="w-[60px] h-[60px]"/>
          <div className="flex flex-col ml-3">
            <span>John Doe</span>
            <span>Review</span>
          </div>
        </div>
        <span className="text-[14px]">3 days ago</span>
      </div>
      <div className="mt-4">
        This is a very great and promising app.
      </div>
    </div>
  );
}

export default ReviewCard;