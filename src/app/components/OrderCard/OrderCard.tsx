import type { FC } from "react";
import styles from "./OrderCard.module.scss";

interface OrderCardProps {
  label: string;
  text: string;
}

const OrderCard: FC<OrderCardProps> = ({ label, text }) => {
  return (
    <div className={styles.orderCard}>
      {" "}
      <label htmlFor="huey">
        <input type="radio" id="huey" name="drone" value="huey" checked />{" "}
        {label}
      </label>
      <span>{text}</span>
    </div>
  );
};
export default OrderCard;
