import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import React from "react";
import ActivityList from "./activity_list";
import ReactionList from "./reaction_list";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const NotificationTab = () => {
     const [value, setValue] = React.useState(0);

     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
       setValue(newValue);
     };

    return (
      <Container maxWidth="sm">
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="アクティビティ" {...a11yProps(0)} />
            <Tab label="リアクション" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ActivityList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ReactionList />
        </CustomTabPanel>
      </Container>
    );
}