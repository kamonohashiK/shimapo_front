import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import { Cancel } from "@mui/icons-material";
import { uploadStorage } from "@/app/_api/storage";
import { v4 as uuidv4 } from "uuid";
import { resizeImage } from "@/app/_utils/resize_image";
import { useAlert } from "@/app/_hooks/alert";
import { useDialog } from "@/app/_hooks/dialog";
import { saveImageUrl } from "@/app/_api/endpoints/island_image";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { updatePostedImages } from "@/app/_api/endpoints/user_profile";
import { UserActivityCollection } from "@/app/_api/collections/user_activity";
import { notificationTypes } from "@/app/_constants/notification_types";

export default function ImageUploadForm() {
  // 投稿フォーム関連のstate
  const [files, setFiles] = React.useState<File[]>([]);
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isUploading, setIsUploadinig] = React.useState<boolean>(false);
  const islandId = useSelector((state: RootState) => state.page.uid);
  const userId = useSelector((state: RootState) => state.user.userId);

  const { showAlert } = useAlert();
  const { hideDialog } = useDialog();
  const { setThumbnailList } = useIslandInfo();

  // react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      image: ["image/jpeg", "image/png"],
    },
    onDrop: (acceptedFiles) => {
      // TODO: acceptしているファイル以外がドロップされた場合の処理
      if (acceptedFiles.length > 5) {
        console.log("上限オーバー");
        setError("5枚以上はアップロードできません。");
        setCanSubmit(false);
      } else {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setError("");
        setCanSubmit(true);
      }
    },
  });

  // 画像アップロード処理を一時的にここに書いておく
  async function upload() {
    try {
      setCanSubmit(false);
      setIsUploadinig(true);

      // アクティビティ用に最初の画像のサムネイルを保持する変数
      let firstThumbnailUrl: string = "";
      let count = files.length;

      await Promise.all(
        files.map(async (file) => {
          // UIDを生成
          const uid = uuidv4();

          // 3種類のタイプをループさせてリサイズ→アップロード→DB保存をさせる
          const types = [
            { name: "main", width: 640, height: 360 },
            { name: "large", width: 1920, height: 1080 },
            { name: "thumbnail", width: 160, height: 90 },
          ];
          await Promise.all(
            types.map(async (type) => {
              const path = `${islandId}/${type.name}/${uid}`;
              const resizedFile = await resizeImage(
                file,
                type.width,
                type.height
              );
              const imageUrl = await uploadStorage(path, resizedFile);
              if (imageUrl != "") {
                await saveImageUrl(islandId, userId, imageUrl, type.name);
                if (type.name === "thumbnail" && !firstThumbnailUrl) {
                  firstThumbnailUrl = imageUrl;
                }
              }
            })
          );
          // TODO: 保存が失敗した場合の処理
          // ユーザーの画像投稿数を更新
          await updatePostedImages(userId);
          // アクティビティを保存
        })
      ).then(async () => {
        const activity = new UserActivityCollection(userId);
        await activity.SaveActivity(
          islandId,
          notificationTypes.IMAGE,
          `${count}枚の画像を投稿しました。`,
          firstThumbnailUrl
        );
      });

      showAlert("画像をアップロードしました。", "success");
    } catch (error) {
      showAlert("画像のアップロードに失敗しました。", "error");
    } finally {
      hideDialog();
      setThumbnailList(islandId);
    }
  }

  // 画像の削除
  const remove = (index: number) => () => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setCanSubmit(false);
    }
  };

  return (
    <Stack spacing={2} margin={2}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          // ドラッグ中の状態
          <Button
            disabled={canSubmit}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              opacity: 0.8,
            }}
          >
            画像をドラッグ&ドロップするか、クリックして選択してください。
          </Button>
        ) : (
          // アクションを起こす前のデフォルトの状態
          <Button
            disabled={canSubmit}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            画像をドラッグ&ドロップするか、クリックして選択してください。
          </Button>
        )}
      </div>
      <Typography color="error">
        {" "}
        {error ? error : "※画像ファイルのみ・上限5枚"}
      </Typography>
      {files.length > 0 ? (
        <ImageList cols={5}>
          {files.map((file, index) => (
            <ImageListItem key={index}>
              <img
                src={URL.createObjectURL(file)}
                style={img}
                alt={file.name}
              />
              <ImageListItemBar
                position="top"
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, " +
                    "rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
                }}
                actionIcon={
                  <IconButton sx={{ color: "white" }} onClick={remove(index)}>
                    <Cancel />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null}
      <Button
        variant="outlined"
        disabled={!canSubmit || isUploading}
        onClick={upload}
      >
        アップロード
      </Button>
    </Stack>
  );
}

// プレビュー画像のスタイル
const img = {
  width: "auto",
  height: "100px",
  margin: "10px",
};
