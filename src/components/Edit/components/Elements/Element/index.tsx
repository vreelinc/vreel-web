import { useEffect, useRef, useState } from 'react';
import Styles from '../Elements.module.scss';
import * as AiIcons from 'react-icons/ai';
import BtnShow from './Buttons/BtnShow';
import BtnHide from './Buttons/BtnHide';
import { ElementsType } from '../ElementsData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import {
  removeFromParent,
  setParent,
} from 'src/redux/createSlice/createHeightSlice';
import ToggleButton from 'src/components/Shared/Buttons/ToggleButton/ToggleButton';
import { FormikContainer } from 'src/components/formik/FormikContainer';

const Element: React.FC<{ element: ElementsType; handleDrag?: any }> = ({
  element,
  handleDrag,
}) => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(element.active);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const dispatch = useDispatch();
  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);

  const handleSetHeight = () => {
    setCollapse((collapse) => !collapse);
    dispatch(removeFromParent({ index: currentParent?.index }));

    if (height === 0) {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: 'Elements',
        })
      );
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: 'Elements',
        })
      );

      setHeight(wrapperRef.current.offsetHeight);
    } else {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height - wrapperRef.current.offsetHeight,
          title: 'Elements',
        })
      );

      setHeight(0);
    }
  };

  useEffect(() => {
    setCurrentParent(parent.find((obj) => obj.title === 'Elements'));
  }, [handleSetHeight, collapse]);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  if (!element?.component) {
    return (
      <div className={Styles.elementWrapper}>
        <div className={Styles.element}>
          <div className={Styles.buttonWrapper}>
            <span
              {...handleDrag}
              style={{
                cursor: 'pointer',
              }}
            >
              <img src='/assets/icons/drag.svg' alt='Drag & Drop Icon' />
            </span>

            <FormikContainer
              initialValues={{
                show: element.active,
              }}
            >
              {(formik) => {
                return (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(formik.values);
                    }}
                  >
                    <ToggleButton
                      name='show'
                      backgroundColor='white'
                      height='35'
                      activeTitle='Hidden'
                      activeBackground='#61FF00'
                      activeIcon={<AiIcons.AiOutlineEye />}
                      deactiveTitle='Show'
                      deactiveBackground='#a3a1a1'
                      deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                    />
                  </form>
                );
              }}
            </FormikContainer>
          </div>

          <span className={Styles.element__title} onClick={handleSetHeight}>
            {element.title}
          </span>
          <button onClick={handleSetHeight}>
            {collapse ? (
              <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
            ) : (
              <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
            )}
          </button>
        </div>

        <div
          style={{
            height: `${height}px`,
            overflow: 'hidden',
            width: '100%',
            transition: 'all .5s ease',
          }}
        >
          <div className={Styles.empty_component} ref={wrapperRef}>
            No Component
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Styles.elementWrapper}>
      <div className={Styles.element}>
        <div className={Styles.buttonWrapper}>
          <span
            {...handleDrag}
            style={{
              cursor: 'pointer',
            }}
          >
            <img src='/assets/icons/drag.svg' alt='Drag & Drop Icon' />
          </span>
          <FormikContainer
            initialValues={{
              show: element.active,
            }}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formik.values);
                  }}
                >
                  <ToggleButton
                    name='show'
                    backgroundColor='white'
                    height='35'
                    activeTitle='Hidden'
                    activeBackground='#61FF00'
                    activeIcon={<AiIcons.AiOutlineEye />}
                    deactiveTitle='Show'
                    deactiveBackground='#a3a1a1'
                    deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                  />
                </form>
              );
            }}
          </FormikContainer>
        </div>
        {/* <div onClick={() => setShow(!show)}>
          {show ? <BtnShow /> : <BtnHide />}
        </div> */}
        <span className={Styles.element__title} onClick={handleSetHeight}>
          {element.title}
        </span>
        <button onClick={handleSetHeight}>
          {collapse ? (
            <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
          ) : (
            <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
          )}
        </button>
      </div>

      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          width: '100%',
          transition: 'all 1.5s ease',
        }}
      >
        <div ref={wrapperRef}>
          <element.component />
        </div>
      </div>
    </div>
  );
};

export default Element;
