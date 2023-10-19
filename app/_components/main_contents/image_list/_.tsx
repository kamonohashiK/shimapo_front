import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Fab, Tooltip } from "@mui/material";
import { useMap } from "@/app/_hooks/map";
import { useEffect } from "react";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import { FavoriteButton } from "./favorite_button";

export default function CustomImageList() {
  const islandId = useSelector((state: RootState) => state.page.uid);
  const userId = useSelector((state: RootState) => state.user.userId);
  const [imageList, setImageList] = React.useState<
    {
      id: string;
      url: any;
      posted_at: any;
      posted_by: string;
      liked_by: string[];
    }[]
  >([]);
  const { setIsMap, getLargeImages } = useMap();

  useEffect(() => {
    const fetchImages = async () => {
      const items = await getLargeImages(islandId);
      if (items.length > 0) {
        setImageList(items);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <Box height={110} sx={{ backgroundColor: "black" }} />
      <Tooltip title="地図に戻る">
        <Fab
          onClick={() => setIsMap(true)}
          variant="extended"
          color="primary"
          sx={{
            marginTop: "60px",
            position: "fixed",
            right: 40,
            top: 10,
            color: "white",
            overflowY: "visible",
          }}
        >
          <CloseIcon />
        </Fab>
      </Tooltip>
      <ImageList
        sx={{
          width: "100%",
          height: "100vh;",
          padding: "20px",
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: "translateZ(0)",
          overflowY: "scroll",
          backgroundColor: "black",
        }}
        rowHeight={320}
        cols={2}
      >
        {imageList.map((item, index) => {
          return (
            <ImageListItem key={index}>
              <img
                src={`${item.url}`}
                alt={`画像${index + 1}`}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionIcon={
                  <FavoriteButton
                    userId={userId}
                    imageId={item.id}
                    liked={item.liked_by.includes(userId)}
                  />
                }
                actionPosition="right"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
}
