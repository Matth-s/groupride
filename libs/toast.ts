import { Flip, toast } from 'react-toastify';

export const toastError = (message: string) => {
  return toast.error(message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Flip,
  });
};

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Flip,
  });
};
