import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromParent,
  setParent,
} from 'src/redux/createSlice/createHeightSlice';
import { RootState } from 'src/redux/store/store';
import { components } from '../../data';
import Styles from './MobileForm.module.scss';

const MobileFormButton: React.FC<{
  obj: { title: string; href: string };
  index: number;
}> = ({ obj, index }) => {
  const dispatch = useDispatch();
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const currentParent = parent.find((obj) => obj.index === index);

  const [height, setHeight] = useState<number>(0);
  const [collapse, setCollapse] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  const handleSetHeight = () => {
    setCollapse((collapse) => !collapse);
    dispatch(removeFromParent({ index: index }));

    if (height === 0) {
      dispatch(
        setParent({
          index: index,
          height: wrapperRef.current.offsetHeight,
          title: obj.title,
        })
      );
      setHeight(wrapperRef.current.offsetHeight);
    } else {
      dispatch(
        setParent({
          index: index,
          height: 0,
          title: obj.title,
        })
      );

      setHeight(0);
    }
  };

  const pathName = obj.href.split('/').reverse()[0];
  const element = components.find((obj) => obj.title === pathName);

  if (!element?.component) {
    return (
      <div className={Styles.buttonWrapper__button}>
        <button
          onClick={handleSetHeight}
          className={Styles.button}
          // className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
        >
          <span>{obj.title}</span>
          <span className=''>
            {height === 0 ? (
              <img className='w-8' src='/assets/collapse-plus.png' alt='' />
            ) : (
              <img className='w-8' src='/assets/collapse-minus.png' alt='' />
            )}
          </span>
        </button>

        <div
          style={{
            height: `${collapse ? currentParent.height : height}px`,
          }}
          className={Styles.buttonWrapper__elementWrapper}
        >
          <p ref={wrapperRef} className='p-[1rem] lg:p-[2rem] text-white'>
            No Component
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={Styles.buttonWrapper__button}
      // className='rounded-2xl  bg-vreel_blue_dark'
    >
      <button
        onClick={handleSetHeight}
        className={Styles.button}
        // className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
      >
        <span>{obj.title}</span>
        <span className=''>
          {height === 0 ? (
            <img className='w-8' src='/assets/collapse-plus.png' alt='' />
          ) : (
            <img className='w-8' src='/assets/collapse-minus.png' alt='' />
          )}
        </span>
      </button>

      <div
        style={{
          height: `${collapse ? currentParent?.height : height}px`,
        }}
        className={Styles.buttonWrapper__elementWrapper}
      >
        <div ref={wrapperRef} className=''>
          <element.component />
        </div>
      </div>
    </div>
  );
};

export default MobileFormButton;
