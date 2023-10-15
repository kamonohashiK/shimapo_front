import { Box, Divider, Stack, Typography } from "@mui/material"

const statsData = [
    {title: "画像投稿数", value: "4k"},
    {title: "質問数", value: "12"},
    {title: "回答数", value: "120"},
    {title: "回答への高評価", value: "246"},
]

export const UserStats = () => {
    return (
      <Stack
        direction="row"
        spacing={2}
        margin={3}
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "10px" }} />
        {statsData.map((data, index) => {
          return (
            <>
              <Stack
                direction="column"
                spacing={2}
                key={index}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="caption" color="black">
                  {data.title}
                </Typography>
                <Typography variant="h5" color="black">
                  {data.value}
                </Typography>
              </Stack>
              {index === statsData.length - 1 ? null : (
                <Divider orientation="vertical" flexItem />
              )}
            </>
          );
        })}
        <Box sx={{ width: "10px" }} />
      </Stack>
    );
}