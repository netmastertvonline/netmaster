import dynamic from "next/dynamic"
import React from "react";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css"

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
}

const Editor = ({ onChange, value }: EditorProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])
    return (
        <div className="max-h-[300px] bg-white overflow-y-auto">
            <ReactQuill
            className=""
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Editor;