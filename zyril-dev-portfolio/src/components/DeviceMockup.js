import Image from "next/image";

const DeviceMockup = ({ src, alt, priority = false }) => {
    // This component now assumes the image `src` already includes the device mockup.
    // It provides a container for consistent sizing and styling within the gallery.
    return (
        <div className="flex-shrink-0 w-auto max-h-[500px] md:max-h-[600px] p-1 group">
            {/* Adjust max-w-xs/sm/md or specific widths as needed based on your mockup image aspect ratios */}
            <div className="relative h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <Image
                    src={src}
                    alt={alt}
                    width={400} // Provide a base width, height will be auto based on aspect ratio
                    height={800} // Provide a base height
                    className="object-contain w-full h-full" // Ensure image scales nicely within its bounds
                    priority={priority}
                />
            </div>
        </div>
    );
};

export default DeviceMockup;
