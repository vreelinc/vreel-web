import clsx from 'clsx';
import { useState } from 'react';
import Styles from './LinkCard.module.scss';

import ChildInput from '@shared/Inputs/ChildInput';

const LinkCard: React.FC = () => {
  const options = [
    {
      title: 'URL',
      logo: '/assets/calltoaction/global-line.svg',
    },
    {
      title: 'Slide',
      logo: '/assets/calltoaction/slide.svg',
    },
    {
      title: 'Element',
      logo: '/assets/calltoaction/stack-line.svg',
    },
  ];

  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeButtonType, setActiveButtonType] = useState<
    'URL' | 'Slide' | 'Element' | string
  >('URL');

  return (
    <div className={Styles.link_card}>
      <div className={Styles.link_card_left}>
        <img src='/assets/images/female.png' alt='Picture of a Lady' />
        <ChildInput type='text' placeholder='Tag' />
      </div>

      <div className={Styles.link_card_right}>
        <ChildInput type='text' placeholder='Link Header' />
        <div className={Styles.options}>
          {options.map((option, index) => (
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
          ))}
        </div>
        {activeButtonType === 'URL' && (
          <ChildInput type='text' placeholder='URL' />
        )}
        {activeButtonType === 'Slide' && (
          <select
            defaultValue='Choose Slide'
            className={Styles.select}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value='slide-1' className={Styles.option}>
              Slide 1
            </option>
            <option value='slide-2' className={Styles.option}>
              Slide 2
            </option>
            <option value='slide-3' className={Styles.option}>
              Slide 3
            </option>
            <option value='slide-4' className={Styles.option}>
              Slide 4
            </option>
            <option value='slide-5' className={Styles.option}>
              Slide 5
            </option>
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
