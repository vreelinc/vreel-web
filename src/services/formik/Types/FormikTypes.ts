export interface FormikFormCommonTypes {
  username?: string;
  email: string;
  password: string;
}
export interface FormikRegFormTypes extends FormikFormCommonTypes {
  confirmPassword: string;
}
export interface FormikControlPropsTypes {
  control: string;
  type?: string;
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  slideinput?: boolean;
  elementInput?: boolean;
  colorInput?: boolean;
  social?: {
    logo: string;
    title: string;
  };
  icon?: boolean;
}
export interface FormikControlPropsTypes {
  control: string;
  type?: string;
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  slideinput?: boolean;
  src?: string;
  advanced?:boolean
}
