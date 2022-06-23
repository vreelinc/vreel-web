import Styles from '../Children.module.scss';
import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';
import ChildInput from '@shared/Inputs/ChildInput';
import FormikControl from '@formik/FormikControl';
import { FormikContainer } from '@formik/FormikContainer';

const ImageGallery: React.FC = () => {
  const initialValues = {
    header: '',
    background: '#b3bac3',
    font: '#b3bac3',
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FormikControl
                control='input'
                type='text'
                name='header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
                icon={false}
              />
              <AddTitleButton title='Add Image' />

              <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control='input'
                    type='color'
                    name='background'
                    colorInput={true}
                  />
                  <FormikControl
                    control='input'
                    type='color'
                    name='font'
                    colorInput={true}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default ImageGallery;
