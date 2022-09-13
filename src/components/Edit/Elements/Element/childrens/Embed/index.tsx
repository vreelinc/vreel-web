import { useMutation } from '@apollo/client';
import { DELETE_EMBED_ELEMENT, EDIT_EMBED_ELEMENT } from '@edit/Elements/schema';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import FActionsBtn from '@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn';
import ChildInput from '@shared/Inputs/ChildInput';
import { useState } from 'react';
import Styles from '../Children.module.scss';

const Embed: React.FC = ({ data, token }: any) => {
  const initialValues = {
    header: data.header,
    embed_code: data.embed_code,
    background_color: data.background_color,

  };
  const [editEmbed] = useMutation(EDIT_EMBED_ELEMENT);
  const [deleteEmbed] = useMutation(DELETE_EMBED_ELEMENT);
  const [currentVals, setCurrentVals] = useState(initialValues);

  const handleSubmit = async (values) => {

    console.log("temp ->", currentVals)
    editEmbed({
      variables: {
        token,
        elementId: data.id,
        embed: currentVals
      }
    }).catch(err => alert(err.message))
      .then(() => alert("successfully updated!"))
  };

  function handleDelete() {
    deleteEmbed({
      variables: {
        token,
        elementId: data.id
      }
    }).then(() => alert("successfully removed embed"))
      .catch(err => alert(err.message))
  }

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          setCurrentVals(formik.values)
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FActionsBtn
                title="Save Embed"
                padding="7px 13px"
                bgColor="#11b03e"
                color="white"
                actions={handleSubmit}
              />
              <FActionsBtn
                title="Delete Embed"
                padding="7px 13px"
                bgColor="red"
                color="white"
                actions={handleDelete}
              />
              <FormikControl
                control='input'
                type='text'
                name='header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
                icon={true}
              />
              <FormikControl
                control='textarea'
                type='text'
                name='embed_code'
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
                    name='background_color'
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
