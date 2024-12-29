'use client';
import { useEffect, MouseEvent, useState, type FC } from 'react';
import styled from './modal.module.scss';
import SpriteSVG from '../SpriteSVG/SpriteSVG';

interface ModalProps {
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: FC<ModalProps> = ({ handleClose, children, title }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.code !== 'Escape') return;
    setShow(false);
    setTimeout(() => handleClose(), 250);
  };

  const handleClickBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    setShow(false);
    setTimeout(() => handleClose(), 250);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={`${styled.overlay} ${show && styled.show}`}
      onClick={handleClickBackdrop}
    >
      <div className={styled.modal}>
        <button
          className={styled.close}
          type="button"
          onClick={() => {
            setShow(false);
            setTimeout(() => handleClose(), 250);
          }}
        >
          <SpriteSVG width={24} height={24} href="icon-cross" />
        </button>
        {title && <h2 className={styled.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
