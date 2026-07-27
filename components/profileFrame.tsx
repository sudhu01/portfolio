import Image from "next/image";


export default function ProfileFrame() {
  return (
    <div className="flex w-full items-stretch text-black dark:text-white relative top-6">
      {/* Left Avatar */}
      <div className="shrink-0 border-r border-(--pattern)">
        <div className="mx-2 my-3 sm:mx-3">
          <div className="relative isolate rounded-full overflow-visible">
            {/* Glow Frame */}
            <div className="absolute inset-0 rounded-full border-2 border-green-800/60 blur-[1px]" />
            <div className="absolute inset-0 rounded-full border-2 border-green-800 blur-md" />
            <div className="absolute inset-0 scale-110 rounded-full opacity-30 blur-3xl bg-linear-to-tr from-green-800 via-transparent to-green-800" />

            {/* Avatar */}
            <div className="relative rounded-full">
              <Image
                src="/profile_pic.jpg"
                width={160}
                height={160}
                alt="Avatar"
                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full object-cover ring-1 ring-zinc-400 ring-offset-2 ring-offset-white select-none dark:ring-zinc-600 dark:ring-offset-neutral-950"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top tiny text */}
        <div className="flex grow items-end pb-1 pl-3 sm:pl-4">
          <p className="hidden sm:block font-mono text-xs text-zinc-500 select-none">
            text-4xl text-black font-semibold
          </p>
        </div>

        {/* Bottom Section */}
        <div className="min-w-0 border-t border-(--pattern)">
          {/* Name Row */}
          <div className="min-w-0 pl-3 sm:pl-4 py-2">
            <h1 className="text-xl font-semibold tracking-tight wrap-break-word sm:text-3xl md:text-4xl">
              Sudharsan Balajee
            </h1>
          </div>

          {/* Bio */}
          <div className="min-w-0 border-t border-(--pattern) py-2 pl-3 sm:pl-4">
            <p className="font-mono text-xs sm:text-sm text-zinc-400">
              Creating with code. Every detail matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}