import React from 'react';
import Media from './common/Media/Media';
import RichTextarea from './common/RichTextarea/RichTextarea';
import Textarea from './common/Textarea/Textarea';

import { Input } from './index';
import { FormikControlPropsTypes } from './Types/FormikTypes';
const FormikControl = ({ control, ...rest }: FormikControlPropsTypes) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'rich_textarea':
      return <RichTextarea {...rest} />;
    case 'media':
      return <Media {...rest} />;
    default:
      return null;
  }
};
export default FormikControl;
