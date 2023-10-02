"use client";
import { RootState } from "@/app/_store/store";
import {
  Container,
  Box,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import IslandImageList from "./island_image_list";
import QuestionList from "./question_list";
import React from "react";
import SidebarTop from "./sidebar_top";

const topImageUrl =
  "https://source.unsplash.com/random?w=360&h=240&fit=crop&auto=format";

const itemData = [
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
];

const questions = [
  {
    question: "この島のプレイスポットについて教えてください。",
    answerCount: 0,
    answers: [],
  },
  {
    question: "この島の食事スポットについて教えてください。",
    answerCount: 2,
    answers: [
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        postedAt: "2021/10/10 10:10",
        postedBy: "hoge",
        postedByImage: "https://source.unsplash.com/random",
        likes: 10,
      },
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        postedAt: "2021/10/10 10:10",
        postedBy: "hoge",
        postedByImage: "https://source.unsplash.com/random",
        likes: 10,
      },
    ],
  },
];

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

export default function SidebarIslandInfo() {
  const islandInfo = useSelector((state: RootState) => state.page);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
        <SidebarTop
          imageUrl={topImageUrl}
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
          <IslandImageList itemData={itemData} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <QuestionList questions={questions} />
        </CustomTabPanel>
    </Container>
  );
}
