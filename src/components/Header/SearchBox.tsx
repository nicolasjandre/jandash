import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  return (
    <Flex
      display={['none', 'none', 'none', 'flex']}
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="44"
      maxW={400}
      alignItems="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Icon fontSize={20} as={RiSearchLine} />
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
      />
    </Flex>
  );
}
