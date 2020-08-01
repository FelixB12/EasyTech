import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Box mt={8}>
        {"Copyright © "}
        <Link color="inherit" href="https://easy-tech.ca/">
          Easy-Tech
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Box>
    </Typography>
  );
}
