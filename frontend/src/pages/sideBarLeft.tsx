"use client";

import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactText, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FiMenu } from "react-icons/fi";
import { Button } from "@chakra-ui/react";
import CategoryPopUp from "../components/AddCategory";
import { Api } from "../libs/api";
import { getCategoryData } from "../components/AddCategory";

interface LinkItemProps {
  name: string;
}

export interface Category {
  color: number;
  description: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "All Task" },
  { name: "Favourites" },
  { name: "Groceries" },
  { name: "Work" },
  { name: "Study" },
  { name: "Sports" },
];

export default function SideBarLeft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [category, setCategory] = useState<Category[]>([])
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleCategorySubmit = async (categoryData: Category) => {
    try {
      await Api.post("/create/category", categoryData);
      console.log("Submitted category data:", categoryData);
    } catch (error) {
      console.error("Error submitting category data:", error);

    }
  };
  

  const fetchCategoryData = async () => {
    try {
      const categoryData = (await getCategoryData).data;
      setCategory(categoryData)
      console.log("Category data:", categoryData);
    } catch (err) {
      console.error();
    }
  };

  useEffect(()=>{
    fetchCategoryData()
  }, [category])

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={60}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="100" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          To Do List
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name}>{link.name}</NavItem>
      ))}

{category.map((link) => (
        <NavItem key={link.description}>{link.description}</NavItem>
      ))}
      <Button
        bg={"white"}
        onClick={openPopup}
        color={"gray"}
        ml={"10px"}
        w={"85%"}
      >
        +New Category
      </Button>
      {isPopupOpen && (
        <CategoryPopUp onClose={closePopup} onSubmit={handleCategorySubmit} />
      )}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
