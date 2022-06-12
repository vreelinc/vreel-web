import clsx from 'clsx';
import { useState } from 'react';
import AddTitleButton from 'src/components/Shared/Buttons/AddTitleButton/AddTitleButton';
import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';
const Events: React.FC = () => {
  const [activeList, setActiveList] = useState<boolean>(true);

  return (
    <div className={Styles.children}>
      <ChildInput placeholder='Element Header' type='text' />

      <div
        className={Styles.toggleButton}
        onClick={() => setActiveList((prev) => !prev)}
      >
        <button
          className={clsx(Styles.button, !activeList && Styles.button__active)}
        >
          Calendar View
        </button>
        <button
          className={clsx(Styles.button, activeList && Styles.button__active)}
        >
          List View
        </button>
      </div>

      <span className={Styles.toggleTitle}>Toggle To Calendar Mode</span>

      <AddTitleButton title='Add Event' />
    </div>
  );
};

export default Events;
