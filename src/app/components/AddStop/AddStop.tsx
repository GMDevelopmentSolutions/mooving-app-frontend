import { useEffect, useState, type FC } from "react";
import Btn from "../Btn/Btn";
import styles from "./AddStop.module.scss";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
interface AddStopProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const AddStop: FC<AddStopProps> = ({ onClick, type = "button" }) => {
  const [width, setWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth < 490) {
        setWidth(true);
      } else {
        setWidth(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.addStop}>
      <Btn onClick={onClick} type={type}>
        <span>
          {width && (
            <SpriteSVG
              href="icon-add_location_alt"
              color="#F56F51"
              width={19}
              height={22}
            />
          )}
          {!width && (
            <SpriteSVG
              href="icon-plus"
              color="#F56F51"
              width={14}
              height={14}
            />
          )}
          Add stop
        </span>
      </Btn>
    </div>
  );
};
export default AddStop;
