import { useMutation, useQuery } from "@apollo/client";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { SET_PAGE_INVITE_Duration, SET_PAGE_PASSWORD } from "@graphql/mutations";
import { GET_PAGE_INVITATION } from "@graphql/query";
import useDidMountEffect from "@hooks/useDidMountEffect";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import PrivacyRequests from "@shared/Collaborator/Privacy";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const requests = [{
    id: "1",
    email: "aaronmarsh755@gmail.com"
}];

const inviteDurations = [
    { title: "5 minutes", value: "5m" },
    { title: "10 minutes", value: "10m" },
    { title: "30 minutes", value: "30m" },
    { title: "1 hour", value: "1h" },
]

export default function Privacy() {
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { currentPageId } = useSelector((state: RootState) => state.editorSlice);
    const [hasPasswordSet, setHasPasswordSet] = useState(false);
    const [securityOptions, setSecurityOptions] = useState<any>({ password: '', requests: [], invite_duration: "" });
    const [setPagePassword] = useMutation(SET_PAGE_PASSWORD);
    const [invitations, setInvitations] = useState([]);
    const { data, error } = useQuery(GET_PAGE_INVITATION, { variables: { token, pageId: currentPageId, } });
    const [setPageInviteDuration] = useMutation(SET_PAGE_INVITE_Duration);
    useEffect(() => {
        if (data) {
            console.log(data)
            setInvitations(data?.pageInvitations.invites);
            setSecurityOptions({ invite_duration: data?.pageInvitations?.invite_duration as string })
        }
    }, [data, error])
    function handleSetPagePassword() {
        setPagePassword({
            variables: {
                token,
                vreelId: currentPageId,
                password: securityOptions.password
            }
        })
            .then(console.log)
            .catch(console.log)
    }
    useDidMountEffect(() => {
        console.log("security request changed")
    }, [securityOptions.requests]);

    function handleSetInviteDuration(e) {
        setSecurityOptions(prev => ({ ...prev, invite_duration: e.target.value }))

        setPageInviteDuration({
            variables: {
                token,
                duration: e.target.value,
                vreelId: currentPageId
            }
        }).then(console.log)
            .then(console.log)
    }

    return (
        <div style={{}}>
            <div style={{ backgroundColor: "#242a41", height: "80vh", borderRadius: "1rem" }}>
                <div style={{ padding: "2rem" }}>
                    <label style={{ fontSize: "20px", color: "white" }}>Secure Your Page</label>
                </div>
                <div style={{ padding: "0.5rem" }}>
                    {data &&
                        <FormikContainer initialValues={securityOptions}>
                            {
                                (formik) => {
                                    // const { invite_duration } = formik.values;
                                    // setSecurityOptions(formik.values)
                                    return (
                                        <div>
                                            <div style={{
                                                display: "flex"
                                            }}>
                                                <div>
                                                    {console.log("so", securityOptions.invite_duration)}
                                                    <select value={securityOptions.invite_duration} onChange={(e) => {
                                                        handleSetInviteDuration(e);
                                                    }}>
                                                        {
                                                            inviteDurations.map((item) => (
                                                                <option value={item.value}>{item.title}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <section style={{ paddingLeft: "1rem" }}>
                                                    < FormikControl
                                                        control="input"
                                                        type="password"
                                                        placeholder="page123"
                                                        name="password"
                                                        required={true}
                                                        slideinput={true}
                                                        personalInfo={true}
                                                    />
                                                </section>
                                                <section style={{ marginLeft: "2pc" }}>
                                                    <button onClick={handleSetPagePassword} style={{ backgroundColor: "white", padding: "0.8rem" }} >Save</button>
                                                </section>
                                            </div>

                                            <div style={{ marginTop: "1rem" }}>
                                                <PrivacyRequests invitations={invitations} setInvitations={setInvitations} />
                                            </div>
                                        </div>
                                    )
                                }

                            }</FormikContainer>
                    }

                </div>
                <div>

                </div>
            </div >
        </div >
    )
}