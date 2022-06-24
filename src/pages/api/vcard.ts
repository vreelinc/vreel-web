import { NextApiRequest as Request, NextApiResponse as Response } from "next";

import vCardsJS from "vcards-js";

export default async function handler(req: Request, res: Response) {
  const vCard = vCardsJS();

  const { username, employee } = req.query;

  if (!username) {
    vCard.firstName = "Donta'";
    vCard.lastName = "Bell";
    vCard.cellPhone = "(856) 625-0364";
    vCard.title = "CEO Vreel Inc.";
    vCard.url = "https://vreel.page/vreel";
    vCard.note = "We make you look better!";
    res.setHeader("Content-Type", `text/vcard; name="vreel.vcf"`);
    res.setHeader("Content-Disposition", `inline; filename="vreel.vcf"`);
    return res.send(vCard.getFormattedString());
  } else {
    let user = null;
    if (username && employee) user = await employeeVcard(username, employee);
    else if (username) user = await employeeVcard2(username);
    // if (username) user = await companyVcard(username);
    else return res.send("Not Found");

    if (user?.first_name) {
      const filename =
        username && employee ? `${username}_${user.first_name}` : `${username}`;
      try {
        /*  console.log(user);
      user = {
        id: "cafb25q23akj9g4qk1f0",
        title: "",
        profilePicture: "",
        first_name: "Jon",
        last_name: "Stephens",
        email: "jstephens@avaicg.com",
        account_type: "employee",
        companyName: "",
        username: "cafb22q23akj9g4qk1b0",
        middle_initial: "",
        prefix: "",
        suffix: "",
        home_phone: "",
        cell_phone: "2815820793",
        work_phone: "7138581131",
        business_address: "18314 Mathis Rd., Waller, TX 77484",
        home_address: "920 Memorial City Way Ste 715, Houston TX 77024",
        website: "",
        landing_page: "",
        job_title: "President",
      }; */
        const vcard = generateVcard(vCard, user);

        res.setHeader("Content-Type", `text/vcard; name="${filename}.vcf"`);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${filename}.vcf"`
        );

        return res.send(vcard.getFormattedString());
      } catch (e) {
        console.log({ e });

        return res.status(500).json(e);
      }
    }
    return res.send("Not Found");
  }
}

async function companyVcard(username) {
  return fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
    query User($username: String!) {
      username(username: $username) {
        id
        title
        profilePicture
        first_name
        last_name
        email
        account_type
        companyName
        username
        middle_initial
        prefix
        suffix
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
      }
    }
      `,
      variables: {
        username,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result?.data?.username;
    });
}
async function employeeVcard(username, employee) {
  return fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query enterprise($enterpriseName: String!,$employeeId:String!) {
        enterpiseEmployee(enterpriseName: $enterpriseName,employeeId:$employeeId){
          employee{
            id
            title
            profilePicture
            first_name
            last_name
            email
            account_type
            companyName
            username
            middle_initial
            prefix
            suffix
            home_phone
            cell_phone
            work_phone
            business_address
            home_address
            website
            landing_page
            job_title
          }
        }}
      `,
      variables: {
        enterpriseName: username,
        employeeId: employee,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      // console.log(result.data.enterpiseEmployee.employee);
      return result?.data?.enterpiseEmployee?.employee;
    });
}
async function employeeVcard2(username) {
  return fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query User($username: String!) {
        username(username: $username) {
          id
          title
          profilePicture
          first_name
          last_name
          email
          account_type
          companyName
          username
          middle_initial
          prefix
          suffix
          home_phone
          cell_phone
          work_phone
          business_address
          home_address
          website
          landing_page
          job_title
        }
      }
      `,
      variables: {
        username: username,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      // console.log(result.data.enterpiseEmployee.employee);
      return result?.data?.username;
    });
}

function generateVcard(vCard, user) {
  /*   const user = {
    id: "cafb25q23akj9g4qk1f0",
    title: "",
    profilePicture: "",
    first_name: "Jon",
    last_name: "Stephens",
    email: "jstephens@avaicg.com",
    account_type: "employee",
    companyName: "",
    username: "cafb22q23akj9g4qk1b0",
    middle_initial: "",
    prefix: "",
    suffix: "",
    home_phone: "",
    cell_phone: "2815820793",
    work_phone: "7138581131",
    business_address: "18314 Mathis Rd., Waller, TX 77484",
    home_address: "920 Memorial City Way Ste 715, Houston TX 77024",
    website: "",
    landing_page: "",
    job_title: "President",
  }; */

  vCard.firstName = user.first_name;
  vCard.middleName = user.middle_initial;
  vCard.lastName = user.last_name;
  vCard.homeAddress.street = user.home_address;
  // vCard.work = s.business_address;
  // vCard.organization = "Making Milionaires";
  vCard.workPhone = user.work_phone;
  vCard.homePhone = user.home_phone;
  vCard.cellPhone = user.cell_phone;
  vCard.title = user.job_title;
  vCard.url = user.website;
  // vCard.note = "Notes for Kmos";
  return vCard;
}
