import { Button, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ImageUploadForm() {
  // react-dropzoneのサンプルコードをそのまま使っている
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Stack spacing={2} margin={3}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          // ドラッグ中の状態
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              opacity: 0.8,
            }}
          >
            ファイルを選択
          </Button>
        ) : (
          // アクションを起こす前のデフォルトの状態
          <Button
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
    </Stack>
  );
}
