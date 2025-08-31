import Image from "next/image";

type SubmitButtonProps = {
    submitted: boolean;
    loading: boolean;
};

export default function SubmitButton({
    submitted,
    loading,
}: SubmitButtonProps) {
    const showAssets = loading || submitted;

    return (
        <button
            type="submit"
            disabled={loading || submitted}
            className="relative px-20 py-4 rounded-lg font-bold
        bg-pink-300 text-purple-800
        transition-all duration-300 ease-in-out
        hover:bg-gradient-to-br hover:from-pink-300 hover:to-white/40
        hover:scale-105 hover:shadow-md
        disabled:opacity-70 disabled:cursor-not-allowed group"
        >
            {/* default text */}
            <span className="block group-hover:hidden">
                {loading ? "SUBMIT?" : submitted ? "SUBMITTED!" : "SUBMIT"}
            </span>

            {/* hover text */}
            {!submitted && !loading && (
                <span className="hidden group-hover:block">SUBMIT?</span>
            )}

            {/* Decorative assets */}
            <Image
                src="/eyes.png"
                alt=""
                width={32}
                height={32}
                className={`absolute bottom-0 left-0 w-8 h-8 transition-all duration-500 pointer-events-none
          ${
              showAssets
                  ? "opacity-100 -translate-x-4 translate-y-4"
                  : "opacity-0 -translate-x-1 translate-y-1"
          }
          group-hover:opacity-100 group-hover:-translate-x-4 group-hover:translate-y-4`}
            />
            <Image
                src="/diamonds.png"
                alt=""
                width={32}
                height={32}
                className={`absolute top-0 right-0 w-8 h-10 transition-all duration-500 pointer-events-none
          ${
              showAssets
                  ? "opacity-100 translate-x-4 -translate-y-4"
                  : "opacity-0 translate-x-1 -translate-y-1"
          }
          group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4`}
            />
        </button>
    );
}
