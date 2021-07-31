import React, { FC } from "react";
import Link from "next/link";
import styles from "../styles/MainMenuItem.module.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export interface IMainMenuItemProps {
  title: string;
  description: string;
  href: string;
  enabled?: boolean;
}

const MainMenuItem: FC<IMainMenuItemProps> = ({ title, description, href, enabled = true }) => {

  if (!enabled) {
    href = ''
  }

  return (
    <Link href={href} >
      <div className={styles.item}>
        <a href={href} className={styles.item__link}>
          <div className={styles.item__title}>
            {title} <ArrowRightAltIcon viewBox="0 0 20 15" />
          </div>

          <div className={styles.item__description}>{description}</div>
        </a>
      </div>
    </Link>
  );
};

export default MainMenuItem;
