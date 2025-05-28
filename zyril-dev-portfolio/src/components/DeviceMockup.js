import Image from "next/image";

const DeviceMockup = ({ src, alt, priority = false }) => {
    return (
        <div className="w-1/3 max-w-[300px] p-2 group">
            <div className="relative aspect-[9/16] w-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                    priority={priority}
                />
            </div>
        </div>
    );
};

export default DeviceMockup;
