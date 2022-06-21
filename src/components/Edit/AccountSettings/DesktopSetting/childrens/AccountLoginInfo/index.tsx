import { FormikContainer } from "src/components/formik/FormikContainer";
import FormikControl from "src/components/formik/FormikControl";
import Styles from "./AccountLoginInfo.module.scss";

const AccountLoginInfo: React.FC = () => {
  return (
    <div className={Styles.accountLogin}>
      <span className={Styles.title}>Account Email</span>

      <FormikContainer>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                //   handleLogin(formik.values);
              }}
            >
              <FormikControl
                control="input"
                type="text"
                placeholder="info@vreel.page"
                name="email"
                required={true}
                slideinput={true}
              />
              <button className="btn-save btn-save--sm" type="submit">
                Save
              </button>
            </form>
          );
        }}
      </FormikContainer>

      <span className={Styles.title}>Password</span>
      <FormikContainer>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                //   handleLogin(formik.values);
              }}
            >
              <FormikControl
                control="input"
                type="text"
                placeholder="Current Password"
                name="current_pass"
                required={true}
                slideinput={true}
              />
              <FormikControl
                control="input"
                type="text"
                placeholder="New Password"
                name="new_pass"
                required={true}
                slideinput={true}
              />
              <FormikControl
                control="input"
                type="text"
                placeholder="Confirm Password"
                name="confirm_pass"
                required={true}
                slideinput={true}
              />
              <button className="btn-save btn-save--sm" type="submit">
                Save
              </button>
            </form>
          );
        }}
      </FormikContainer>

      <button className="btn-forget">
        <span>Forgot Password?</span>
      </button>
    </div>
  );
};

export default AccountLoginInfo;
