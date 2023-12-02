import { Box } from "@chakra-ui/react";
import MiddleBar from "./middleBar";
import SideBarLeft from "./sideBarLeft";

export default function Home() {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <SideBarLeft />
        </Box>
        <Box flex={1}>
          <MiddleBar />
        </Box>
      </Box>
    </>
  );
}
