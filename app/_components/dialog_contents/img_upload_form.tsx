import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ImageUploadForm() {
  // 投稿フォーム関連のstate
  // TODO: File.previewが存在しないエラーの解消
  const [files, setFiles] = React.useState<File[]>([]);
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

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
      <Typography paragraph>※画像ファイルのみ・上限5枚</Typography>　
      <Typography color="error">{error}</Typography>
      <div className="flex">
        {files.map((file, index) => (
          <div key={index}>
            <img src={file.preview} style={img} alt={file.name} />
          </div>
        ))}
      </div>
      <Button variant="outlined" disabled={!canSubmit}>
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
