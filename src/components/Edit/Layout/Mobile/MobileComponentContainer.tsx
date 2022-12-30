import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import UserProfile from "@shared/UserProfile/UserProfile"
import { useRouter } from "next/router";
import Styles from "./MobileDashboard.module.scss";

function Header() {
    const router = useRouter();
    return (
        <div
            style={{ display: "flex", justifyContent: "space-evenly", padding: "2rem" }}

        >
            <FActionsBtn
                title={`Back`}
                padding="0.5rem 2rem"
                bgColor="gray"
                color="white"
                actions={() => router.push('/edit')}
            />
            <FActionsBtn
                title={`Files`}
                padding="0.5rem 2rem"
                bgColor="gray"
                color="white"
                actions={() => router.push('/edit/files')}
            />
            <section style={{ marginTop: "0.5rem" }}>
                <UserProfile section="edit" />
            </section>
        </div>
    )
}

export default function MobileComponentContainer({ children }) {
    return (
        <div>
            <Header />
            <div style={{ padding: "1rem" }}>
                {children}
            </div>
        </div>
    )
}