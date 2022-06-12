import AddTitleButton from 'src/components/Shared/Buttons/AddTitleButton/AddTitleButton';
import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';

const ImageGallery: React.FC = () => {
  return (
    <div className={Styles.children}>
      <ChildInput type='text' placeholder='Header' icon={true} />
      <AddTitleButton title='Add Image' />
    </div>
  );
};

export default ImageGallery;
