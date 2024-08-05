'use client';

import React, { SetStateAction, useEffect, useRef } from 'react';

type InputFocusWrapperProps = {
  setOpenResult: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const InputFocusWrapper = ({
  setOpenResult,
  children,
}: InputFocusWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenResult(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default InputFocusWrapper;
