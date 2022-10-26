import { useMutation, useQuery } from "@apollo/client";
import AccountSensitivity from "@edit/AccountSettings/PersonalInfo/AccountSensitivity";
import PersonalInfoFields from "@edit/AccountSettings/PersonalInfo/PersonalInfoFields";
import Element from "@edit/Elements/Element/Element";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { client } from "@graphql/index";
import {
  ADD_EMPLOYEE_TO_ENTERPRISE,
  REMOVE_EMPLOYEE_FROM_ENTERPRISE,
  UPDATE_EMPLOYEE,
} from "@graphql/mutations";
import {
  GET_ENTERPRISE_EMPLOYEES,
  GET_USER_BY_TOKEN,
  GET_USER_PAGES,
} from "@graphql/query";
import { setEditorPages } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import LogoBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SlideLogo";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import Collapse from "@shared/Collapse/Collapse";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Styles from "./Enterprise.module.scss";

const analyticsBaseUrl = `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/vreel.page/`;
const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const AccountKeys = [
  "first_name",
  "last_name",
  "email",
  "prefix",
  "website",
  "suffix",
  "work_phone",
  "cell_phone",
  "home_phone",
  "job_title",
  "profile_picture",
  "company_name",
  "business_address",
  "home_address",
  "landing_page",
  "middle_initial",
  "self_portrait_image",
  "self_landscape_image",
  "linkedin_url",
  "note",
  "pages_ref",
  "pages",
  "v_email",
  "pages_ref",
];
interface Props {
  pages: string[];
}
const initialValues = {
  name: "mobile" || "desktop",
  uri: "uri",
};

function EmployeeCard({
  title,
  user,
  token,
  refetch,
  pages,
}: {
  title: string;
  id: string;
  user: any;
  token: string;
  pages: string[];
  refetch: (o: any) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE_FROM_ENTERPRISE);
  const [pagesRef, setPagesRef] = useState(user.pagesRef);
  const [currentVals, setCurrentVals] = useState(user);
  const { username } = useSelector((state: RootState) => state.userAuth.user);
  const [employeeAnalyticsUrl] = useState(
    `${analyticsBaseUrl}?&page=%2F${username}%2Fe%2F${user.id}`
  );
  const [employeeUrl] = useState(`${baseUrl}/${username}/e/${user.id}`);
  function handleSubmit(values) {
    const fields = [];
    for (let [field, value] of Object.entries(values)) {
      if (field === "companyName") field = "company_name";
      if (field === "linkedinUrl") field = "linkedin_url";
      if (AccountKeys.includes(field)) {
        fields.push({
          field,
          value,
        });
      }
    }
    fields.push({
      field: "pages_ref",
      value: pagesRef,
    });

    updateEmployee({
      variables: {
        token,
        employee: user.id,
        fields,
      },
    }).catch((err) => alert(err.message));
  }

  function deleteEmployee() {
    removeEmployee({
      variables: {
        token,
        employee: user.id,
      },
    })
      .then(() => {
        alert("removed employee!");
        refetch({
          token,
        });
      })
      .catch((err) => alert(err.message));
  }
  return (
    <div
      style={{ backgroundColor: "gray", padding: "30px", borderRadius: "10px" }}
    >
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{title}</h1>
        <div>
          <button
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "10px",
            }}
            onClick={() => setOpen(!open)}
          >
            {!open ? "Open" : "Close"}
          </button>
        </div>
      </section>
      <label style={{ backgroundColor: "white", padding: "3px" }}>
        {user.id}
      </label>
      {open && (
        <div style={{ padding: "10px" }}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(employeeAnalyticsUrl);
              alert("Copied Analytics Url");
            }}
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "10px",
              marginRight: "100px",
            }}
          >
            Copy Analytics Url
          </button>
          <button
            onClick={() => window.open(employeeAnalyticsUrl)}
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "10px",
              marginRight: "100px",
            }}
          >
            View Analytics
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(employeeUrl);
              alert("Copied Employee Url");
            }}
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "10px",
              marginRight: "100px",
            }}
          >
            Copy Employee Url{" "}
          </button>
          <button
            onClick={() => window.open(employeeUrl)}
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "10px",
              marginRight: "100px",
            }}
          >
            View Employee
          </button>

          <FormikContainer initialValues={currentVals}>
            {(formik) => {
              // alert("rerender")
              const { values } = formik;
              setCurrentVals(values);
              return (
                <form style={{ marginTop: "4px" }} onSubmit={handleSubmit}>
                  <PersonalInfoFields onSave={handleSubmit} />
                  <div style={{ display: "flex" }}>
                    <FormikControl
                      control="media-image"
                      name={`self_portrait_image`}
                      image={values.selfPortraitImage}
                    />
                    <label style={{ color: "white", marginTop: "3pc" }}>
                      Portrait Image
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <FormikControl
                      control="media-image"
                      name={`self_landscape_image`}
                      image={values.selfLandscapeImage}
                    />
                    <label style={{ color: "white", marginTop: "3pc" }}>
                      Landscape Image
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <FormikControl
                      control="media-image"
                      name={`profile_picture`}
                      image={values.profilePicture}
                    />
                    <label style={{ color: "white", marginTop: "3pc" }}>
                      Profile Image
                    </label>
                  </div>
                  <div>
                    <label>Select Page</label>
                    <section>
                      <select
                        onChange={(e) => setPagesRef(e.target.value)}
                        value={pagesRef}
                      >
                        {pages.map((id) => {
                          return <option value={id}>{`Page: ${id}`}</option>;
                        })}
                      </select>
                    </section>
                  </div>
                </form>
              );
            }}
          </FormikContainer>
          <section>
            <FActionsBtn
              title={`Update ${user.first_name}`}
              padding="7px 13px"
              bgColor="#11b03e"
              color="white"
              actions={handleSubmit}
            />
            <FActionsBtn
              title={`Remove ${user.first_name}`}
              padding="7px 13px"
              bgColor="red"
              color="white"
              actions={deleteEmployee}
            />
          </section>
        </div>
      )}
    </div>
  );
}

const Enterprise = ({ pages }: Props) => {
  const [cookies] = useCookies(["userAuthToken"]);
  const { data, error, refetch } = useQuery(GET_ENTERPRISE_EMPLOYEES, {
    variables: { token: cookies.userAuthToken },
  });
  const [addEmployee] = useMutation(ADD_EMPLOYEE_TO_ENTERPRISE);
  const [employees, setEmployees] = useState([]);
  const [newEmployeeEmail, setNewEmployeeEmail] = useState<string>("");
  const dispatch = useDispatch();
  // useEffect(() => {
  //     const pageValues = pages.map((page, idx) => ({ id: page, name: `Page ${idx}` }))
  //     dispatch(setEditorPages([pageValues]))
  // }, [])

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
    if (data) {
      setEmployees(data.enterpriseByToken.employees);
    }
  }, [error, data]);

  function handleAddEmployee() {
    addEmployee({
      variables: {
        token: cookies.userAuthToken,
        input: {
          account_type: "employee",
          username: "",
          email: newEmployeeEmail,
          password: "",
        },
      },
    })
      .then(() => {
        alert("added new employee: " + newEmployeeEmail);
        refetch({
          token: cookies.userAuthToken,
        });
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div>
      <section>
        <input
          style={{ padding: "10px" }}
          placeholder="New Employee Email"
          onChange={(e) => setNewEmployeeEmail(e.target.value)}
        />
        <FActionsBtn
          title="Add New Employee"
          padding="7px 13px"
          bgColor="#11b03e"
          color="white"
          actions={handleAddEmployee}
        />
      </section>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <div>
              {employees.map((employee) => (
                <div key={employee.id} style={{ margin: 30 }}>
                  <EmployeeCard
                    pages={pages}
                    token={cookies.userAuthToken}
                    user={employee}
                    id={employee.id}
                    title={`${employee.first_name || "Unamed "} 
                    ${employee.last_name || "Employee"}`}
                    refetch={refetch}
                  />
                </div>
              ))}
            </div>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default Enterprise;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const token = req.cookies["userAuthToken"];

  if (!token) return res.writeHead(301, { Location: "/" });

  const resp = await client.query({
    query: GET_USER_PAGES,
    variables: { token },
  });
  const data = resp.data?.getUserByToken;
  if (!resp.error) {
    const pages = data?.pages.map((page) => page.id);
    return {
      props: {
        pages: [data.id, ...pages] as string[],
      },
    };
  }
};
