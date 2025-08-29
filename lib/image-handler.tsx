import monthlerApiHandler from "@/lib/monthler-api-handler";
import axios from "axios";

const handleImageUpload = async (file: File, onProgress?: (e: { progress: number }) => void): Promise<string> => {
    try {
        // 1. 사전 서명된 URL 요청
        const res = await monthlerApiHandler.get(`/files/upload/pre-signed-url`, {
            params: {
                fileName: file.name,
            },
        });

        if (res.status !== 200) {
            throw new Error("Failed to get pre-signed URL");
        }

        const { preSignedUrl, savedFileUrl } = await res.data.result;

        // 2. axios로 업로드 진행
        const fileBuffer = await file.arrayBuffer();
        const byteArray = new Uint8Array(fileBuffer);

        await axios.put(preSignedUrl, file, {
            headers: {
                "Content-Type": file.type || "image/png",
                "Content-Length": byteArray.byteLength.toString(),
            },
            onUploadProgress: (event) => {
                const percent = Math.round((event.loaded / (event.total || 1)) * 100);
                onProgress?.({ progress: percent });
            },
        });

        // 3. 최종 이미지 URL 반환
        return savedFileUrl;
    } catch (error: any) {
        alert(error.response?.data?.message || error.message || "An error occurred");
        return;
    }
};

export default handleImageUpload;