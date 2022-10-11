import IcecastMetadataPlayer from "icecast-metadata-player";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

type AudioSources = "icecast"

interface AudioProps {
    audioType: AudioSources,
    endpoint?: string
}

interface AudioControls {
    muteAudio: () => void
    startAudio: () => void
    setAudioSrc: (src: string) => void
    isInitialized: boolean
    muted: boolean
}

export default function useAudio({ audioType, endpoint }: AudioProps): AudioControls {
    const [audioElement, setAudioElement] = useState(new Audio());
    const [icecast, setIcecast] = useState<IcecastMetadataPlayer>();
    const [muted, setMuted] = useState<boolean>(true);
    const [src, setSrc] = useState<string>(endpoint);
    const [isInitialized, setIsInitialized] = useState(false);
    const [tempMuted, setTempMuted] = useState(false);

    function muteAudio() {
        setMuted(true)
        icecast?.stop()
    }
    function startAudio() {
        setMuted(false)
        icecast?.play();
    }
    function setAudioSrc(src: string) {
        setSrc(src);
    }

    function onVisibilityChange() {
        if (document.visibilityState === "visible") {
            if (!tempMuted) {
                startAudio()
            }
        } else {
            setTempMuted(muted);
            muteAudio()

        }
    }

    // useEffect(() => {
    //     if (!icecast) return;
    //     document.addEventListener('visibilitychange', onVisibilityChange);

    //     return () => {
    //         document.removeEventListener("visibilitychange", onVisibilityChange)
    //     }
    // }, [icecast])
    //mount interaction listener
    // useEffect(() => {
    //     function handleBodyClick() {
    //         // if (isInitialized && !muted) {
    //         //     startAudio()
    //         // }
    //     }

    //     document.body.addEventListener("click", handleBodyClick);
    //     return () => {
    //         document.body.removeEventListener("click", handleBodyClick)
    //     }
    // }, [isInitialized])

    useEffect(() => {
        return () => {
            setAudioElement(null);
            icecast?.stop()
        }
    }, [])

    useEffect(() => {
        (async () => {
            if (audioType === "icecast" && src) {
                const IcecastMetadataPlayer = await import("icecast-metadata-player");
                const player = new IcecastMetadataPlayer.default(src, {
                    onMetadata: (meta) => {
                    },
                    onError(message, error?) {

                    },
                    audioElement
                });

                setIcecast(player);
                setIsInitialized(true);

            }
        })()

    }, [src]);

    useEffect(() => {
        // if (icecast) {
        // console.log("state", icecast?.)
        // commandStack.forEach((cmd) => cmd());
        // }
    }, [isInitialized])
    return { muteAudio, startAudio, setAudioSrc, isInitialized, muted }
}