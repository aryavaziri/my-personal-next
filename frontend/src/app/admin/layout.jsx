import { ApolloWrapper } from "@lib/ApolloWrapper";

export default async function Layout({ children }) {
    return <ApolloWrapper>{children}</ApolloWrapper>;
}