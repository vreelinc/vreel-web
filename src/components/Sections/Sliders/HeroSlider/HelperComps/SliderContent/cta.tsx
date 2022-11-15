import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Styles from "./SliderContent.module.scss";


interface Props {
    buttonFontName: string
    cta: {
        link_header: string;
        link_url: string;
        link_type: string;
    },
    navigateToSlide: (id: string) => void;
    navigateToSection: (id: string) => void
}

export default function CallToActionButton({
    navigateToSection,
    navigateToSlide,
    buttonFontName,
    cta: { link_type, link_header, link_url }
}: Props): JSX.Element {
    const [textLength, setTextLength] = useState<number>(0);
    const router = useRouter();
    useEffect(() => {
        if (link_header.length > 10) {
            setTextLength(13);
        } else {
            setTextLength(8);
        }

    }, []);
    return (
        <div
            className={Styles.button_container}
            style={
                {
                    "--direction": `${textLength > 10 ? "column" : "row"}`,
                    "--marginBottom": `${textLength > 10 ? ".5" : ".2"}rem`,
                    "--marginRight": `${textLength > 10 ? "0" : "1"}rem`,
                } as any
            }
        >
            <>
                {(() => {
                    switch (link_type.toLowerCase() || "url") {
                        case "document":
                            return (
                                <button
                                    style={{ fontFamily: buttonFontName }}
                                    className="btn-slide"
                                    onClick={() => {
                                        window.open(`/view/doc/${encodeURIComponent(link_url)}`)
                                    }}
                                >
                                    {link_header}{" "}
                                </button>
                            );
                        case "call":
                            return (
                                <a
                                    className="btn-slide"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`tel:${link_url}`}
                                >
                                    {link_header}
                                </a>
                            );
                        case "employee":
                            return (
                                <a
                                    className="btn-slide"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`/api/vcard?id=${link_url}`}
                                >
                                    {link_header}
                                </a>
                            );
                        case "email":
                            return (
                                <a
                                    className="btn-slide"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`mailto:${link_url}`}
                                >
                                    {link_header}
                                </a>
                            );
                        case "document":
                            return (
                                <a
                                    target="_blank"
                                    onClick={() => alert(link_url)}
                                    className="btn-slide"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: buttonFontName,
                                    }}
                                    href={link_url}
                                >
                                    {link_header}
                                </a>
                            );
                        case "url":
                            return (
                                <button
                                    className="btn-slide"
                                    style={{ fontFamily: buttonFontName }}
                                    onClick={() => {
                                        switch (link_type) {
                                            // case "URL":
                                            case "url":
                                            case "URL":
                                            case "":
                                                console.log(link_header?.trim());
                                                if (
                                                    link_url.startsWith("https://")
                                                )
                                                    link_header?.trim() ===
                                                        "LOGIN"
                                                        ? window.open(
                                                            link_url,
                                                            "_self"
                                                        )
                                                        : window.open(
                                                            link_url,
                                                            "_blank"
                                                        );
                                                else router.push(link_url);
                                                break;

                                            default:
                                                break;
                                        }
                                    }}
                                >
                                    {link_header}{" "}
                                </button>
                            );

                        case "slide":
                            return (
                                <button
                                    style={{ fontFamily: buttonFontName }}
                                    className="btn-slide"
                                    onClick={() => {
                                        navigateToSlide(link_url);
                                    }}
                                >
                                    {link_header}{" "}
                                </button>
                            );
                        case "sections":
                            return (
                                <button
                                    onClick={() =>
                                        navigateToSection(link_url)
                                    }
                                    className="btn-slide"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: buttonFontName,
                                    }}
                                >
                                    {link_header}
                                </button>
                            );
                    }
                })()}
            </>

        </div>

    )

}