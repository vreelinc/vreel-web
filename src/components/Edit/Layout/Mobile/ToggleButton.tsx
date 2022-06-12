import { useRouter } from 'next/router';
import { useState } from 'react';

const ToggleButton: React.FC = () => {
  const [buttonState, setButtonState] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className='btn-toggle'>
      <div
        onClick={() => {
          setButtonState(!buttonState);
          router.push('/');
        }}
        className='btn-toggle__wrapper'
        // className='bg-secondary rounded-[40px] border-2 border-white p-[2px] flex justify-between'
      >
        <button
          className={
            buttonState
              ? 'btn-toggle__wrapper__active'
              : 'btn-toggle__wrapper__inactive'
          }
          // className={`w-full font-medium rounded-[40px] py-1 px-4 text-white ${
          //   buttonState && 'bg-white text-secondary'
          // }`}
        >
          View
        </button>
        <button
          className={
            !buttonState
              ? 'btn-toggle__wrapper__active'
              : 'btn-toggle__wrapper__inactive'
          }
          // className={`w-full font-medium rounded-[40px] py-1 px-4 text-white ${
          //   !buttonState && 'bg-white text-secondary'
          // }`}
        >
          Edit
        </button>
      </div>
      <p className='text'>Toggle To View VReel</p>
    </div>
  );
};

export default ToggleButton;
