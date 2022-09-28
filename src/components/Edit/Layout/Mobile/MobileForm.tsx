import { advanceOptions, editOptions } from "../../data";
import MobileFormButton from "./MobileFormButton";
import Styles from "./MobileForm.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { useDispatch } from "react-redux";
import { setCurrentPageId } from "@redux/createSlice/editorSlice";

const MobileForm: React.FC = () => {
  const nestedHeight = useSelector((state: RootState) => state.nestedHeight);
  const { pages, currentPageId } = useSelector((state: RootState) => state.editorSlice);
  const dispatch = useDispatch();

  function handlePageChange(id: string) {
    dispatch(setCurrentPageId(id))
  }


  console.log({ nestedHeight });

  return (
    <div className={Styles.mobileForm}>
      <div style={{ padding: "3pc" }}>
        <h2 style={{ color: "white" }}>Page</h2>
        <select value={currentPageId} onChange={(e) => handlePageChange(e.target.value)}>
          {
            pages.map(({ id }) => (
              <option>{id}</option>
            ))
          }
        </select>
      </div>
      <div style={{ marginTop: "0pc" }} className={Styles.buttonWrapper}>
        {editOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} index={index} />
        ))}
      </div>

      {/* <div
        className={Styles.advanceTitle}
        // className='text-secondary text-lg my-6 advance'
      >
        Advanced
      </div>
      <div className={Styles.buttonWrapper}>
        {advanceOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} index={index} />
        ))}
      </div> */}
    </div>
  );
};

export default MobileForm;

{
  /* <div className='text-secondary text-lg my-6 advance'>Edit Vreels</div>;
{
  regularOptions.map((obj) => {
    if (obj.children) {
      return (
        <div className='px-4 space-y-5'>
          {obj.children.map((obj, index) => (
            <MobileFormButton key={index} obj={obj} />
          ))}
        </div>
      );
    }
  });
} */
}
