import clsx from 'clsx';
import { useCallback, useState } from 'react';
import Styles from './LinkCard.module.scss';

import ChildInput from '@shared/Inputs/ChildInput';
import FormikControl from '@formik/FormikControl';
import { useFormikContext } from 'formik';
import { useSlideRefer } from '@hooks/useSlideRefer';
import { useRouter } from 'next/router';

const LinkCard: React.FC = () => {
  interface ItemProps {
    id: number;
    title: string;
    url?: string;
  }
  const options: Array<ItemProps> = [
    { id: 1, title: 'URL', url: '/assets/calltoaction/global-line.svg' },
    { id: 2, title: 'Slide', url: '/assets/calltoaction/slide.svg' },
    { id: 3, title: 'Element', url: '/assets/calltoaction/stack-line.svg' },
  ];
  const [active, setActive] = useState(0);
  const { setFieldValue, values } = useFormikContext();
  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeButtonType, setActiveButtonType] = useState<
    'URL' | 'Slide' | 'Element' | string
  >('URL');

  const handleActive = useCallback(
    (index: number, title) => {
      setFieldValue(`link_type`, title);
      setActive(index);
      setActiveButtonType(title);
    },
    [active]
  );
  const router = useRouter();
  const { getSlidesData } = useSlideRefer();
  const { menu, username, slidesContent } = getSlidesData();

  console.log(values);

  return (
    <div className={Styles.link_card}>
      <div className={Styles.link_card_left}>
        {/* <FormikControl control='media' name='mobile' /> */}
        <img src='/assets/images/female.png' alt='Picture of a Lady' />
        <FormikControl
          control='input'
          type='text'
          name='tag'
          placeholder='Tag'
          elementInput={true}
          icon={false}
        />
        {/* <ChildInput type='text' placeholder='Tag' /> */}
      </div>

      <div className={Styles.link_card_right}>
        <ChildInput type='text' placeholder='Link Header' />
        <div className={Styles.options}>
          {options.map((item: ItemProps, index: number) => (
            <div
              key={index}
              className={clsx(
                active === index ? Styles.active : Styles.deactive
              )}
              onClick={() => handleActive(index, item.title)}
            >
              <img src={item.url} alt='Call element Icon' />
              <span>{item.title}</span>
            </div>
          ))}

          {/* {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveButton(index);
                setActiveButtonType(option.title);
              }}
              className={clsx(
                Styles.button,
                activeButton === index && Styles.button_active
              )}
            >
              <img src={option.logo} alt={option.title} />
              <span>{option.title}</span>
            </button>
          ))} */}
        </div>
        {activeButtonType === 'URL' && (
          <FormikControl
            control='input'
            type='text'
            name='url'
            placeholder='URL'
            elementInput={true}
            icon={false}
          />
        )}
        {activeButtonType === 'Slide' && (
          <select
            defaultValue='Select Slides'
            onChange={(e) => {
              setFieldValue(`url`, e.target.value);
              // router.push(e.target.value);
            }}
          >
            <option value='none'>Select Slide</option>
            {slidesContent.map((item, index) => (
              <option key={index} value={`/${username}?slide=${item.id}`}>
                {item.title.header}
              </option>
            ))}
          </select>
        )}
        {activeButtonType === 'Element' && (
          <select
            defaultValue='Choose Element'
            className={Styles.select}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value='element-1' className={Styles.option}>
              Element 1
            </option>
            <option value='element-2' className={Styles.option}>
              Element 2
            </option>
            <option value='element-3' className={Styles.option}>
              Element 3
            </option>
            <option value='element-4' className={Styles.option}>
              Element 4
            </option>
            <option value='element-5' className={Styles.option}>
              Element 5
            </option>
          </select>
        )}
      </div>
    </div>
  );
};

export default LinkCard;
