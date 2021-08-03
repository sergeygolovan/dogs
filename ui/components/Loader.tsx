import { Box, CircularProgress, Fade } from "@material-ui/core";
import React, { FC } from "react";

interface ILoaderProps {
  loading: boolean;
}

const Loader: FC<ILoaderProps> = ({ loading }) => {
  return (
    <>
      <Box
        className="loader"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          left: "50vw",
          top: "50vh",
        }}
      >
        <Box sx={{ height: 50 }}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "100ms" : "0ms",
            }}
          >
            <CircularProgress />
          </Fade>
        </Box>
      </Box>
    </>
  );
};

export default Loader;
