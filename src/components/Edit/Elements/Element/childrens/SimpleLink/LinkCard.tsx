import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import Styles from './LinkCard.module.scss';
import FormikControl from '@formik/FormikControl';
import { useFormikContext } from 'formik';
import { useSlideRefer } from '@hooks/useSlideRefer';
import { useRouter } from 'next/router';

interface ItemProps {
  id: number;
  title: string;
  url?: string;
}

type TypeProps = 'url' | 'slide' | 'element' | string;

const LinkCard: React.FC<{ type: TypeProps }> = ({ type }) => {
  const options: Array<ItemProps> = [
    { id: 1, title: 'url', url: '/assets/calltoaction/global-line.svg' },
    { id: 2, title: 'slide', url: '/assets/calltoaction/slide.svg' },
    { id: 3, title: 'element', url: '/assets/calltoaction/stack-line.svg' },
  ];
  const [active, setActive] = useState(0);
  const { setFieldValue, values } = useFormikContext();
  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeButtonType, setActiveButtonType] = useState<TypeProps>(type);

  const handleActive = useCallback(
    (index: number, title) => {
      setFieldValue(`link_type`, title);
      setActive(index);
      setActiveButton(index);
      setActiveButtonType(title);
    },
    [active]
  );

  useEffect(() => {
    if (type === 'url') {
      setActiveButton(0);
    } else if (type === 'slide') {
      setActiveButton(1);
    } else if (type === 'element') {
      setActiveButton(2);
    }
  }, [type]);

  const router = useRouter();
  const { getSlidesData } = useSlideRefer();
  const { sectionsData, username, slidesContent } = getSlidesData();

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
        <div>
          <FormikControl
            control='input'
            type='text'
            name='link_header'
            placeholder='Link Header'
            required={true}
            elementInput={true}
            icon={false}
          />
        </div>
        <div className={Styles.options}>
          {options.map((item: ItemProps, index: number) => (
            <button
              type='button'
              key={index}
              className={clsx(
                Styles.button,
                activeButton === index && Styles.button_active
              )}
              onClick={() => handleActive(index, item.title)}
            >
              <img src={item.url} alt='Call element Icon' />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        <div className={Styles.inputWrapper}>
          {activeButtonType === 'url' && (
            <FormikControl
              control='input'
              type='text'
              name='url'
              placeholder='URL'
              elementInput={true}
              icon={false}
            />
          )}
          {activeButtonType === 'slide' && (
            <select
              className={Styles.select}
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
          {activeButtonType === 'element' && (
            <select
              className={Styles.select}
              defaultValue='Select Element'
              onChange={(e) => {
                setFieldValue(`url`, e.target.value);
                // router.push(e.target.value);
              }}
            >
              <option value='none'>Select Element</option>
              {sectionsData.map((item, index) => (
                <option key={index} value={`/${username}?slide=${item.id}`}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
