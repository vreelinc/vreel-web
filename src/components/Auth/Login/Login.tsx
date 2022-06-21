import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as Yup from 'yup';
import { ApolloConsumer, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

import Styles from './Login.module.scss';
import { userAuthReducer } from '@redux/createSlice/userSlice';
import { GET_USER_BY_TOKEN, LOGIN_QUERY } from '@graphql/query';

import BtnForm from '@shared/BtnForn/BtnForm';
import AuthContainer from '@shared/AuthContainer/AuthContainer';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';

const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string().required('No password provided.'),
  // .min(8, "Password is too short - should be 8 chars minimum."),
  // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Login = () => {
  /*  var today = new Date();
  today.setMinutes(today.getMinutes() + 1); */
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['userAuthToken']);
  console.log(globalThis?.localStorage?.getItem('item'));

  const router = useRouter();
  console.log(router);
  const [loginUser] = useLazyQuery(LOGIN_QUERY);
  const [getUserByToken] = useLazyQuery(GET_USER_BY_TOKEN);

  const handleLogin = async (formik) => {
    const { email, password } = formik.values;
    if (!email || !password) {
      toast.error('Please fill up the form');
      return;
    }
    try {
      const user = await loginUser({
        variables: {
          email,
          password,
        },
      });
      const userData = await getUserByToken({
        variables: {
          token: user.data.login.token,
        },
      });

      const { username } = userData.data.getUserByToken;
      if (!user.data) {
        toast.error('User not found');
      } else {
        setCookie('userAuthToken', user.data.login.token, {
          path: '/',
          // expires: today,
          secure: true,
        });
        dispatch(userAuthReducer(true));
        router.push(`${username}`);
        // router.back();
        toast.success('Login successful');
      }
      formik.resetForm();
    } catch (error) {
      console.log(error);

      formik.errors['password'] = 'Please provide valid Email and password';
      formik.setSubmitting(false);
    }
  };
  return (
    <AuthContainer>
      <ApolloConsumer>
        {
          (client) => {
            console.log({ client });

            return <div></div>;
          } /* do stuff here */
        }
      </ApolloConsumer>
      <div className={Styles.vreelLoginForm}>
        <div>
          <h4>VREEL Login</h4>
          <FormikContainer
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                    handleLogin(formik);
                  }}
                >
                  <FormikControl
                    control='input'
                    type='email'
                    name='email'
                    placeholder='Phone / Email'
                  />
                  <FormikControl
                    control='input'
                    type='password'
                    placeholder='Password'
                    name='password'
                  />

                  <div className={Styles.btnCenter}>
                    <BtnForm title='Login' type='submit' formik={formik} />
                  </div>
                </form>
              );
            }}
          </FormikContainer>

          <div className={Styles.formWlc}>
            <p>
              <span>Welcome back!</span>
              Please use your email
              <br /> or phone number to login.
            </p>
            <span>
              <Link href={'/'}>Forgot Password?</Link>
            </span>
          </div>

          <div className={Styles.signUp}>
            <p>
              Don't have an account?
              <>
                <br />
              </>
              <Link href='/register'>
                <span className={Styles.signUpBtn}>Sign Up FREE!</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
