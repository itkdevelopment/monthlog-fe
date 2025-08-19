"use client";

import React, { useState } from "react";
import handleImageUpload from "@/lib/image-handler";

const ImageUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadedUrl, setUploadedUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setUploadedUrl("");
            setUploadProgress(0);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            const url = await handleImageUpload(selectedFile, ({ progress }) => {
                setUploadProgress(progress);
            });
            setUploadedUrl(url);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">이미지 업로드</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />

            {selectedFile && (
                <div className="mb-4">
                    <p>파일명: {selectedFile.name}</p>
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        disabled={isUploading}
                    >
                        {isUploading ? "업로드 중..." : "업로드하기"}
                    </button>
                </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                    <p>업로드 진행률: {uploadProgress}%</p>
                    <div className="w-full bg-gray-200 h-4 rounded">
                        <div
                            className="bg-blue-500 h-4 rounded"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {uploadedUrl && (
                <div className="mt-4">
                    <p className="mb-2">업로드된 이미지:</p>
                    <img
                        src={uploadedUrl}
                        alt="Uploaded"
                        className="w-full rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploadPage;
