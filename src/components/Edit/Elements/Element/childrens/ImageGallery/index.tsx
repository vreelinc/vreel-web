import Styles from '../Children.module.scss';
import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';
import ChildInput from '@shared/Inputs/ChildInput';

const ImageGallery: React.FC = () => {
  return (
    <div className={Styles.children}>
      <ChildInput type='text' placeholder='Header' icon={true} />
      <AddTitleButton title='Add Image' />
    </div>
  );
};

export default ImageGallery;
