import ChildInput from '@shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';

const Embed: React.FC = () => {
  return (
    <div className={Styles.children}>
      <ChildInput type='text' placeholder='Header' />
      <ChildInput type='textarea' placeholder='Embed Code' />
    </div>
  );
};

export default Embed;
