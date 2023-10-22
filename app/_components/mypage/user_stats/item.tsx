import { Stack, Typography, Divider, Tooltip, Badge } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

export const UserStatsItem = (props: {
  title: string;
  value: string;
  index: number;
  itemSize: number;
}) => {
  return (
    <>
      <Stack direction="column" spacing={2} key={props.index}>
        <Typography variant="body1">{switchIcons(props.title)}</Typography>
        <Typography
          variant="body2"
          color="black"
          sx={{ fontSize: 18, fontWeight: "bold" }}
        >
          {props.value}
        </Typography>
      </Stack>
      {props.index === props.itemSize - 1 ? null : (
        <Divider orientation="vertical" flexItem />
      )}
    </>
  );
};

function switchIcons(icon: string) {
  switch (icon) {
    case "画像投稿数":
      return (
        <Tooltip title="画像投稿数" placement="top">
          <AddPhotoAlternateOutlinedIcon />
        </Tooltip>
      );
    case "画像への高評価":
      return (
        <Tooltip title="画像への高評価" placement="top">
          <Badge badgeContent={""} variant="dot" color="success">
            <ImageOutlinedIcon />
          </Badge>
        </Tooltip>
      );
    case "質問数":
      return (
        <Tooltip title="質問数" placement="top">
          <QuestionMarkOutlinedIcon />
        </Tooltip>
      );
    case "回答数":
      return (
        <Tooltip title="回答数" placement="top">
          <QuestionAnswerOutlinedIcon />
        </Tooltip>
      );
    case "回答への高評価":
      return (
        <Tooltip title="回答への高評価" placement="top">
          <Badge badgeContent={""} variant="dot" color="success">
            <QuestionAnswerOutlinedIcon />
          </Badge>
        </Tooltip>
      );
    default:
      return null;
  }
}
