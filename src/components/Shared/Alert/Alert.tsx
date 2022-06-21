import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import Styles from './Alert.module.scss';

const Alert = ({
  isAlertActive,
  setAlertActive,
  id,
  type,
  refetch,
  DELETE_SCHEMA,
}) => {
  const [deleteItem] = useMutation(DELETE_SCHEMA);
  const [cookies] = useCookies(['userAuthToken']);
  return isAlertActive ? (
    <div className={Styles.alert_container}>
      <div className={Styles.alert_content}>
        <h3> Are you sure yor wan't to delete it ?</h3>
        <div className={Styles.button_container}>
          <button
            onClick={() => setAlertActive(false)}
            className={Styles.alert_no_btn}
          >
            No
          </button>
          <button
            className={Styles.alert_yes_btn}
            onClick={() => {
              setAlertActive(false);
              deleteItem({
                variables: {
                  token: cookies['userAuthToken'],
                  fileId: id,
                },
              })
                .then((res: any) => {
                  if (res?.data?.deleteFile.succeeded) {
                    refetch();
                    toast.success(`${type} delete successfully`);
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Alert;
