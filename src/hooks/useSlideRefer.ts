import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES_PREVIEW, GET_USER_BY_TOKEN, GET_USER_BY_USER_NAME } from "@graphql/query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useSlideRefer = () => {
  const [cookies] = useCookies(["userAuthToken"]);
  const [employees, setEmployees] = useState([]);
  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN, {
    variables: {
      token: cookies.userAuthToken,
      metadata: {
        presentation: false
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: employeesData, error: employeeError } = useQuery(GET_EMPLOYEES_PREVIEW, {
    variables: {
      token: cookies.userAuthToken
    }
  })

  useEffect(() => {
    if (employeeError) console.log("get employee error", employeeError.message)
    if (employeesData) {
      setEmployees(employeesData?.enterpriseByToken?.employees);
    }
  }, [employeeError, employeesData])

  const getSlidesData = () => {
    const sectionsData = [
      {
        id: "slides",
        name: "Home",
      },
    ];
    let slidesContent = [],
      link: { name: string; id: string } = { name: "", id: "" };

    const username = data?.username?.username;

    if (data) {
      const { slides, simple_links, socials, gallery } =
        data?.getUserByToken?.vreel;
      slidesContent = slides
        .map((item: any) => item)
        .sort((a: any, b: any) => {
          return a.slide_location - b.slide_location;
        });

      gallery.forEach((g) => {
        sectionsData.push({
          id: g.id,
          name: g.header,
        });
      });
      simple_links?.forEach((link) => {
        if (link.links.length > 0) {
          sectionsData.push({
            id: link.id,
            name: link.header,
          });
        }
      });
      socials.forEach((social) => {
        sectionsData.push({
          id: social.id,
          name: social.header,
        });
      });
    }
    return {
      sectionsData,
      username,
      slidesContent,
      employees
    };
  };

  return {
    data,
    getSlidesData,
  };
};
