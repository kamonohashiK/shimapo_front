"use client";
import { RootState } from "@/app/_store/store";
import { Container, Box, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
//import IslandImageList from "./thumbnail_list/_";
//import QuestionList from "./question_list/_";
import { ReactNode, SyntheticEvent, useState } from "react";
import UnderDrawerTop from "./top";

interface TabPanelProps {
  children?: ReactNode;
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

export default function UnderDrawerIslandInfo() {
  const islandInfo = useSelector((state: RootState) => state.page);

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <UnderDrawerTop
        imageUrl={islandInfo.mainImage}
        name={islandInfo.name}
        prefecture={islandInfo.prefecture}
        city={islandInfo.city}
        kana={islandInfo.kana}
        enName={islandInfo.enName}
      />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="画像" {...a11yProps(0)} />
          <Tab label="質問" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/**<IslandImageList />*/}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/**<QuestionList />*/}
      </CustomTabPanel>
    </Container>
  );
}
