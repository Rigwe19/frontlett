import { useState, useRef, type ChangeEvent, type DragEvent } from 'react'
import { LuUpload } from 'react-icons/lu';

type Props = {
    error?: string;
    onChange?: CallableFunction
}

const DragAndDrop = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState('');
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true)
    }
    const handleDragLeave = () => {
        setDragging(false)
    }
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)
        const droppedFiles = e.dataTransfer.files;
        const fileArray: File[] = Array.from(droppedFiles).map(file => file);
        const validFiles = fileArray.filter(file => file.type === 'application/pdf' || file.type.startsWith('image/'))
        if (validFiles.length !== fileArray.length) {
            setError('Only PDF and images are allowed')
        } else {
            setError('')
        }
        const uniqueFiles = [...files, ...validFiles].filter((file, index, self) => index === self.findIndex(f => f.name === file.name))
        setFiles(uniqueFiles);
        props?.onChange && props?.onChange(uniqueFiles)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const fileArray: File[] = Array.from(selectedFiles).map(file => file);
            const validFiles = fileArray.filter(file => file.type === 'application/pdf' || file.type.startsWith('image/'))
            if (validFiles.length !== fileArray.length) {
                setError('Only PDF and images are allowed')
            } else {
                setError('')
            }
            const uniqueFiles = [...files, ...validFiles].filter((file, index, self) => index === self.findIndex(f => f.name === file.name))
            setFiles(uniqueFiles);
            props?.onChange && props?.onChange(uniqueFiles)
        }
    }


    return (
        <div className="flex flex-col items-start gap-[12px] self-stretch">
            <div className="flex h-[71px] flex-col items-start gap-[4px] self-stretch">
                <h2 className="flex-shrink-0 self-stretch text-[#020817] dark:text-neutral-300 font-semibold leading-6">Company Documents</h2>
                <p className="flex-shrink-0 self-stretch text-[#6B7280] text-sm leading-5">Upload certificate of incorporation, business license, or other documents to verify your business</p>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={()=>inputRef.current?.click()}
                className={`w-full flex p-[26px] flex-col items-start gap-2.5 self-stretch rounded-[10px] border-2 ${dragging ? 'border-primary' : 'dark:border-neutral-500 border-[#D1D5DB]'}`}>
                <div className="flex flex-col items-center gap-2 self-stretch">
                    <input ref={inputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
                    <LuUpload size={56} className="text-[#6B7280]" />
                    <p className="self-stretch text-[#6B7280] text-center text-sm">Drag and drop files here, or click to browse</p>
                    <div>{files.map(file => <p key={file.name}>{file.name}</p>)}</div>
                </div>
            </div>
            <p className="text-sm text-red-500">{error}</p>
        </div>
    )
}

export default DragAndDrop