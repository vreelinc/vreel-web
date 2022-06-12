import { FormikContainer } from 'src/components/formik/FormikContainer';
import FormikControl from 'src/components/formik/FormikControl';
import Styles from '../Children.module.scss';
import { socials } from './socialsData';

const Socials: React.FC = () => {
  const initialValues = {
    element__header: '',
  };

  const handleSubmit = async (values) => {
    let obj = {
      element__header: '',
      links: [],
    };
    for (let key in values) {
      if (key === 'element__header') {
        obj['element__header'] = values[key];
      } else {
        obj['links'].push({
          title: key,
          url: values[key],
        });
      }
    }

    console.log(obj);
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
                name='element__header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
              />

              <div>
                {socials.map((social, index) => (
                  <FormikControl
                    key={index}
                    control='input'
                    type='text'
                    name={social.title.toLowerCase()}
                    placeholder='Username'
                    required={true}
                    social={{ logo: social.logo, title: social.title }}
                  />
                ))}
              </div>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default Socials;
