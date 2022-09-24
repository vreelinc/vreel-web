import useDebounce from "@hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { GetFonts } from "src/services/api/fonts/fonts";
import { Dropdown } from 'semantic-ui-react'
import CreatableSelect from 'react-select/creatable';

const InputForm: React.FC<{
  type: any;
  id?: string;
  name: string;
  placeholder: string;
  customClass?: string;
}> = ({ type, id, name, placeholder, customClass }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={` ${customClass}`}
    />
  );
};

export const FontSelector = ({ setFont, placeholder }) => {
  const [raw, setRaw] = useState<string>("");
  const query = useDebounce(raw, 200);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (query !== "") {
      GetFonts(query)
        .then((data) => {
          const fonts = [];
          data.fonts.forEach((font) => {
            console.log(font)
            let words: string[] = font.familyName.split(' ');
            for (let i = 0; i < words.length; i++) {
              words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            fonts.push({
              value: font.regularUri,
              label: words.join(" ")
            })
          });
          console.log(fonts)
          setData(fonts);
        })
        .catch((err) => alert(err.message))
    }
  }, [query]);

  return (
    <div>
      <CreatableSelect
        name="font_select"
        isClearable
        onChange={(data) => (data ? setFont(data) : null)}
        placeholder={placeholder}
        onInputChange={setRaw}
        options={data}
      />
    </div>
  )
}
export default InputForm;
