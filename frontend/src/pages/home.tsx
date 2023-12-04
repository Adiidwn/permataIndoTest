import { Box } from "@chakra-ui/react";
import MiddleBar from "./middleBar";
import SideBar from "./sideBar";

export default function Home() {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <SideBar />
        </Box>
        <Box flex={1}>
          <MiddleBar />
        </Box>
      </Box>
    </>
  );
}
