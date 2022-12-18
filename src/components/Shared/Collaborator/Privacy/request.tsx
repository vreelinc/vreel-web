import { useMutation, useQuery } from "@apollo/client"
import { PLACE_COLLAB_SLIDE } from "@graphql/mutations";
import { GET_PAGE_INVITATION } from "@graphql/query";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn"
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

interface Props {
    requests: [{ email: string, id: string }]
    handleRemove(id: string)

}

export default function PrivacyCollabRequest({ requests, handleRemove }: Props) {
    const [placeSlide] = useMutation(PLACE_COLLAB_SLIDE);
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { currentPageId } = useSelector((state: RootState) => state.editorSlice);
    const { setValues } = useFormikContext();
    return (
        <div style={{ padding: "1rem" }}>
            <section>
                <label style={{ color: 'white' }}>Email Invites</label>
            </section>
            {
                requests?.map((r => (
                    <div key={r.id} style={{
                        backgroundColor: "white",
                        height: "4rem",
                        margin: "1rem",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div style={{ paddingTop: "1.5rem", paddingLeft: "1rem" }}>
                            <label>{r.email}</label>
                        </div>

                        <div style={{ paddingRight: "1rem" }}>
                            <FActionsBtn
                                // Icon={BsPlus}
                                title="Remove"
                                padding="5px 10px"
                                bgColor="red"
                                color="white"
                                actions={() => handleRemove(r.id)} />
                        </div>
                    </div>
                )))
            }
        </div>
    )
}