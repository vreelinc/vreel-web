import { client } from "@graphql/index";
import { GET_USER_BY_TOKEN } from "@graphql/query";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

const analyticsBaseUrl = `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/vreel.page/`;

export default function Analytics(): JSX.Element {

    return (
        <div>
            c
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<any> = async ({ req, res, query }) => {
    const { userAuthToken } = req.cookies;
    const { pageId, employeeId, username: _username } = query;

    console.log(query)

    if (!userAuthToken) res.writeHead(301, { Location: '/login' });
    let usernameQuery = _username || "";
    if (!_username) {
        const { data, error } = await client.query({ query: GET_USER_BY_TOKEN, variables: { token: userAuthToken } });

        if (error) res.writeHead(301, { Location: '/' });

        const { username } = data.getUserByToken;
        usernameQuery = username;
    }
    let analyticsParams = `?page=/${usernameQuery}`
    if (pageId) analyticsParams = analyticsParams + `/p/${pageId}`;
    if (employeeId) analyticsParams = analyticsParams + `/e/${employeeId}`

    const params = analyticsParams.replaceAll("/", "%2f")

    return {
        props: {}, redirect: {
            permanent: true,
            destination: `${analyticsBaseUrl}${params}`
        }
    }
}