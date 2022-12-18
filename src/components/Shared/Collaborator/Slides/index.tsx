import { useMutation } from "@apollo/client"
import { CANCEL_COLLABORATION_REQUEST, CREATE_COLLABORATION_REQUEST, SET_COLLABORATION_REQUEST_STATUS } from "@graphql/mutations"
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";


interface Props {
    slideId: string
}
type: String!
recipient: String!
item_id: String!

function RequestItem({ request, token, handleRemoveRequest }) {
    function handleRemove(e) {
        e.preventDefault();
        handleRemoveRequest(request.id)
    }
    return (
        <div style={{
            backgroundColor: "white",
            height: "5rem",
            borderRadius: "20px",
            // padding: "2rem"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "black" }}>
                <div style={{ padding: "2rem" }}>
                    <label style={{ fontWeight: "bolder" }}>{request.username}</label>
                </div>
                <div style={{ padding: "2rem" }}>
                    <label>{request.status}</label>
                </div>
                <div style={{ paddingRight: "1rem" }}>
                    <button
                        style={{ backgroundColor: "black", color: "white", padding: "0.3rem" }}
                        onClick={handleRemove}>Cancel Request</button>
                </div>
            </div>
        </div>
    )
}

export default function CollaboratorCard({ slideId }: Props) {
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { values } = useFormikContext<any>();
    const [createRequest] = useMutation(CREATE_COLLABORATION_REQUEST);
    const [cancelRequest] = useMutation(CANCEL_COLLABORATION_REQUEST);
    const [username, setUsername] = useState<string>("");
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const reqs = values?.advanced?.collaboration_requests;
        if (reqs) setRequests(reqs)
    }, [])

    function handleAddCollaborator() {
        createRequest({
            variables: {
                token,
                input: {
                    type: "slide",
                    recipient: username,
                    item_id: slideId
                }
            }
        }).then(({ data }) => {
            toast.success("Send Invite Request");
            const newRequest = {
                username,
                id: data.createCollabRequest.message,
                status: "pending"
            }
            setRequests(prev => [...prev, newRequest])
        })
            .catch((err => {
                toast.error(err.message)
            }))
    }

    function handleRemoveCollaborator(collabId: string) {
        cancelRequest({
            variables: {
                token,
                collabId
            }
        }).then(() => {
            setRequests(prev => {
                return prev.filter(r => r.id !== collabId)
            })
        })
            .catch(console.log)
    }

    return (
        <div>
            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <div>
                {
                    requests?.map((req) => (
                        <section style={{ margin: "1rem" }}>
                            <RequestItem handleRemoveRequest={handleRemoveCollaborator} token={token} request={req} />
                        </section>
                    ))
                }
            </div>

            <FActionsBtn
                title="Add Collaborator"
                bgColor="green"
                color="white"
                padding="8px 23px"
                borderRadius="8px"
                actions={handleAddCollaborator}
            />
        </div>
    )
}