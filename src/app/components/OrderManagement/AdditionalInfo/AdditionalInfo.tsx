import type { FC } from 'react';
import styles from './AdditionalInfo.module.scss';
import Button from '../../Button/Button';
interface AdditionalInfoProps {
  onClose: () => void;
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({ onClose }) => {
  return (
    <div className={styles.WrapInfo}>
      <ol className={styles.list}>
        <li className={styles.item}>
          Disassembling and assembling services are included in the price at no
          extra charge.
        </li>
        <li className={styles.item}>
          Protective covers for all furniture are included in the price.
        </li>
        <li className={styles.item}>
          We also provide wardrobe boxes for the duration of the move.
        </li>
        <li className={styles.item}>
          Travel time is taken into account in both directions.
        </li>
      </ol>
      <div className={styles.buttonContainer}>
        <Button buttonClass="buttonGrey" onClick={onClose}>
          I agree
        </Button>
      </div>
    </div>
  );
};
export default AdditionalInfo;
