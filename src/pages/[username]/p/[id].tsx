import { client } from "@graphql/index";
import { GET_PAGE } from "@graphql/query";
import { setVreel } from "@redux/createSlice/vreelSlice";
import Sections from "@sections/Sections";
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import React, { useEffect } from "react"
import { useDispatch } from "react-redux";

export default function ({ vreel }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setVreel(vreel));
    }, [])
    return <Sections vreel={vreel} />;
}

export const getServerSideProps: GetServerSideProps<any> = async ({ params, res }) => {
    const { id } = params;
    const { data, error } = await client.query({ query: GET_PAGE, variables: { id } })
    if (!data) return res.writeHead(301, { Location: '/' })
    return {
        props: {
            vreel: data?.page
        }
    }
}