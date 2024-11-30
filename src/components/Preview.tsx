import dynamic from "next/dynamic"
import React from "react";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css"

interface PreviewProps {
    value: string;
}

const Preview = ({ value }: PreviewProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])
    return (
        <div className="overflow-y-auto h-full max-h-[400px]">
            <ReactQuill
                theme="bubble"
                value={value}
                readOnly
            />
        </div>
    );
}

export default Preview;