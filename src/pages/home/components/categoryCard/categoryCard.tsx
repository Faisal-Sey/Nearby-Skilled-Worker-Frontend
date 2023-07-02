import { ReactNode } from "react";
import styles from "./style.module.scss";

interface CategoryCardProps {
  title: string;
  subtitle?: ReactNode;
  gigs?: number;
}

function CategoryCard({ title, subtitle, gigs }: CategoryCardProps) {
  return ( 
    <div className={styles.categoryCard}>
      <p className="text-[22px]">{title}</p>
      {subtitle && <span className="text-[14px]">{subtitle}</span>}
      {gigs && <span className="text-[14px]">{gigs} gigs</span>}
    </div>
  );
}

export default CategoryCard;