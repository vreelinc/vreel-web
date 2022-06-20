import { NextApiRequest as Request, NextApiResponse as Response } from "next";

import vCardsJS from "vcards-js";

export default async function handler(req: Request, res: Response) {
  const vCard = vCardsJS();
  console.log("HIT ENDPOINT");
  const { username } = req.query;
  // console.log("vCard", username);
  if (!username) {
    vCard.firstName = "Donta'";
    vCard.lastName = "Bell";
    vCard.cellPhone = "(856) 625-0364";
    vCard.title = "CEO Vreel Inc.";
    vCard.url = "https://vreel.page/vreel";
    vCard.note = "We make you look better!";
    res.setHeader("Content-Type", `text/vcard; name="vreel.vcf"`);
    res.setHeader("Content-Disposition", `inline; filename="vreel.vcf"`);
    res.send(vCard.getFormattedString());
  } else {
    try {
      // const user = await getUserByUsername(username.toString());
      // console.log(user);
      // const vcard = GenerateVcard(user)
      vCard.firstName = "Kevin";
      vCard.middleName = "J";
      vCard.lastName = "Mosley";
      vCard.homeAddress.label = "Home Address";
      vCard.homeAddress.street = "123 Main Street";
      vCard.homeAddress.city = "Chicago";
      vCard.homeAddress.stateProvince = "IL";
      vCard.homeAddress.postalCode = "12345";
      vCard.homeAddress.countryRegion = "United States of America";
      vCard.organization = "Making Milionaires";
      vCard.workPhone = "312-555-1212";
      vCard.homePhone = "312-555-1313";
      vCard.cellPhone = "312-555-1414";
      vCard.pagerPhone = "312-555-1515";
      vCard.birthday = new Date(1994, 0, 1);
      vCard.title = "Software Developer";
      vCard.url = "https://kevinjmosley.com";
      vCard.note = "Notes for Kmos";
      // vCard.photo.embedFromFile(kevImg);
      // console.log('img', kevImg)

      res.setHeader("Content-Type", `text/vcard; name="${username}.vcf"`);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${username}.vcf"`
      );

      res.send(vCard.getFormattedString());
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
