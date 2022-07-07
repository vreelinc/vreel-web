import React from 'react';
import Styles from '../Children.module.scss';

import LinkCard from './LinkCard';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';

const SimpleLink: React.FC = () => {
  const simpleLinks = {
    header: '',
    position: 0,
    links: [
      {
        id: 'cb37jpi23akl6a0h3lu0',
        position: 2,
        thumbnail:
          'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
        link_header: 'Elephant',
        url: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
        link_type: 'url',
        tag: 'elephant',
        __typename: 'SimpleLink',
      },
    ],
    __typename: 'SimpleLinksElement',
  };

  // const initialValues = {
  //   element_header: '',
  //   background: '#b3bac3',
  //   font: '#b3bac3',
  // };

  const initialValues = {
    element_header: 'Simple Link 1',
    id: 'cb37jpi23akl6a0h3lu0',
    position: 2,
    thumbnail: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    link_header: 'Elephant',
    url: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    link_type: 'element',
    tag: 'elephant',
    __typename: 'SimpleLink',
    background: '#b3bac3',
    font: '#b3bac3',
  };

  const handleSubmit = async (values) => {
    console.log('Simple Link--', values);
  };

  console.log('Simple Link Rendered...');

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
                icon={false}
              />

              <AddTitleButton title='Add Link' />

              <LinkCard type={initialValues.link_type} />
              {/* <LinkCard />
              <LinkCard />
              <LinkCard /> */}

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

              {/* <button className='sb'>Submit</button> */}
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default React.memo(SimpleLink);
