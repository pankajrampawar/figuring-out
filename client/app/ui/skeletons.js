const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-secondary/70 before:to-transparent';

export function HomeSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <MessageCardSkeleton/>
            <MessageCardSkeleton/>
            <MessageCardSkeleton/>
            <MessageCardSkeleton/>
            <MessageCardSkeleton/>
        </div>
    )
}

const MessageCardSkeleton = () => {
    return (
        <div
            className={`${shimmer} relative overflow-hidden bg-surface min-h-40 flex flex-col px-10 py-3 pb-1`}
        >
            <section className="border-b border-gray-500 h-28">
                <div>
                    <div className="bg-secondary h-6 w-28 mt-2 rounded-md"></div>
                </div>
            </section>

            <section className=" h-10 flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="h-6 w-20 bg-secondary rounded-xl">
                    </div>
                    <div className="h-6 w-14 bg-zinc-700 rounded-xl">

                    </div>
                </div>

                <div className="w-8 bg-secondary rounded-xl h-6">

                </div>
            </section>
        </div>
    )
}