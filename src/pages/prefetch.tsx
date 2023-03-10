import { Flex, Text } from "@chakra-ui/react";

import { Logo } from "../components/Header/Logo";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { getUsers } from "../hooks/useUsers";
import { getRealUser } from "../hooks/useRealUser";
import { api } from "../services/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";

export default function Prefetch() {
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => route.push("/dashboard"), 1000);
  });

  return (
    <>
      <NextSeo
        title="jandash | Bem vindo!"
        description="Jandash, a sua solução para dashboards performáticos."
      />
      <Flex
        flexDir="column"
        w="100vw"
        h="90vh"
        align="center"
        justify="center"
        p={["4", "6"]}
      >
        <Logo fontSize={["50", "64"]} pb="32" />

        <Text fontSize={["22", "28"]} pb="4">
          Welcome!
        </Text>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await getSession(ctx.req, ctx.res);
  const session = JSON.parse(JSON.stringify(response));

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await api.post("realusers/create", {
    name: session?.user?.name,
    email: session?.user?.email,
    sex: "Não informado",
    profession: "Não informado",
  });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["real_user"], () =>
    getRealUser(session?.user?.email)
  );
  await queryClient.prefetchQuery(["users", 1], () => getUsers(1, 10));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
