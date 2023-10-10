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

export default function ImageUploadForm() {
  // 投稿フォーム関連のstate
  // TODO: File.previewが存在しないエラーの解消
  const [files, setFiles] = React.useState<File[]>([]);
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isUploading, setIsUploadinig] = React.useState<boolean>(false);
  const islandId = useSelector((state: RootState) => state.page.uid);

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
  const upload = () => {
    console.log("submit");
    setCanSubmit(false);
    setIsUploadinig(true);
    try {
      // 想定: バケットURL/{islandId}
      // NOTE: 先にDBへメタデータを保存してIDを得てからアップロードするのが良さそう

      const uploadedUrls: any[] = [];
      files.forEach(async (file, index) => {
        var path = `${islandId}/test${index}`;
        uploadedUrls.push(uploadStorage(path, file));
      });

      console.log(uploadedUrls);
      // TODO: アップロードされた画像のURLを取得してDBに保存する
      // TODO: 島のデータを再ロード・storeを更新

      setFiles([]);
      // TODO: 成功時のAlert表示
    } catch (error) {
      console.log(error);
      // TODO: 失敗時のAlert表示
    } finally {
      setIsUploadinig(false);
      if (files.length === 0) {
        setCanSubmit(true);
      }
    }
  };

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
              <img src={file.preview} style={img} alt={file.name} />
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
