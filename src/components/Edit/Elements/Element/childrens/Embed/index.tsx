import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import ChildInput from '@shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';

const Embed: React.FC = () => {
  const initialValues = {
    element_header: '',
    embed__code: '',
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
                name='element_header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
                icon={true}
              />
              <FormikControl
                control='textarea'
                type='text'
                name='embed__code'
                placeholder='Embed Code'
                required={true}
                elementInput={true}
                icon={true}
              />

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

export default Embed;
