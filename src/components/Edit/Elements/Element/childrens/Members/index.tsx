import { useMutation, useQuery } from "@apollo/client"
import { GET_EMPLOYEES_PREVIEW, GET_ENTERPRISE_EMPLOYEES } from "@graphql/query"
import { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import useDebounce from "@hooks/useDebounce";
import useDidMountEffect from "@hooks/useDidMountEffect";
import { DELETE_MEMBERS_ELEMENT, REMOVE_EMPLOYEES_FROM_MEMBERS_ELEMENT, SET_EMPLOYEES_MEMBERS_ELEMENT } from "@graphql/mutations";
import dynamic from "next/dynamic";
import clsx from "clsx"
import { DragComponent } from "./drag";
import { EDIT_ELEMENT_HEADER } from "@edit/Elements/schema";
// interface Props {
//   element: any;
//   token: string;
// }

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr
}

export default function MembersEditor({ element, token }) {
  const { data, error } = useQuery(GET_EMPLOYEES_PREVIEW, { variables: { token } });
  const [selectableEmployees, setSelectableEmployees] = useState([]);
  const [setEmployees] = useMutation(SET_EMPLOYEES_MEMBERS_ELEMENT);
  const [deleteMembersElement] = useMutation(DELETE_MEMBERS_ELEMENT);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [updateHeader,] = useMutation(EDIT_ELEMENT_HEADER);
  const [header, setHeader] = useState<string>(element.header);
  const debounceHeader = useDebounce(header);

  useDidMountEffect(() => {
    updateHeader({
      variables: {
        token,
        elementId: element.id,
        elementType: "members",
        header: header
      }
    })
  }, [debounceHeader])

  function handleAddEmployee(_, item) {
    setSelectedEmployees(prev => {
      const set = ([...prev, { ...item, index: prev.length + 1 }]);
      updateEmployees(set);
      return set;
    });

  }

  function handleEmployeeChange(list) {
    setSelectedEmployees(list)
    updateEmployees(list)

  }

  function updateEmployees(set) {
    setEmployees({
      variables: {
        token,
        employee: set.map(({ value, index }) => {
          return JSON.stringify({ employee_id: value, position: index })
        }),
        sectionId: element.id
      }
    }).then(console.log)
      .catch(console.log)
  }

  function handleDeleteElement() {
    deleteMembersElement({
      variables: {
        token,
        id: element.id
      }
    })
      .then(() => alert("removed members"))
      .catch(console.log)
  }





  useEffect(() => {
    if (data) {
      //set and prefill selectable options
      const selectable = data.enterpriseByToken.employees.map((employee =>
        ({ value: employee.id, name: `${employee.first_name} ${employee.last_name}`, index: 0 })))
      const { slides } = element;
      const preSelectedIds = slides.map(({ author }) => author)
      const selectedPrefill = selectable.filter((item) => preSelectedIds.includes(item.value))
        .map(item => ({
          ...item,
          index: slides
            .filter(slide => slide.author === item.value)[0].slide_location
        }))
        .sort((a: any, b: any) => {
          return a.slide_location - b.slide_location;
        });
      console.log("prefill", selectedPrefill);
      setSelectedEmployees(selectedPrefill)
      setSelectableEmployees(selectable);
      console.log(selectableEmployees)
    }
  }, [data, error])



  return (
    <div style={{ height: "25rem" }}>
      <div style={{ margin: "3rem", alignItems: "center" }}>
        <input value={header} placeholder="Header" onChange={(e) => setHeader(e.target.value)} />
      </div>
      <Multiselect
        options={selectableEmployees} // Options to display in the dropdown

        selectedValues={selectedEmployees} // Preselected value to persist in dropdown
        onSelect={handleAddEmployee} // Function will trigger on select event
        onRemove={handleEmployeeChange} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      />
      <div>
        <DragComponent items={selectedEmployees} setItems={(result) => {
          setSelectedEmployees(result);
          updateEmployees(result)
        }} />

      </div>
      <section>
        <button style={{ backgroundColor: "white", padding: "0.5rem" }} onClick={handleDeleteElement}>Delete Members Section</button>
      </section>
    </div>
  )
}