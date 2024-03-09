const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-secondary/70 before:to-transparent';

export default function ProfileSkeleton () {
    return <div className={`${shimmer} relative overflow-hidden bg-surface min-h-60 flex flex-col px-10 py-3 pb-1 gap-10`}>
        <div className="bg-zinc-800 max-w-16 min-h-16 rounded-xl">

        </div>

        <div className="flex justify-evenly">
            <div className="bg-zinc-800 min-w-16 min-h-16 rounded-xl">
            </div>
            <div className="bg-zinc-800 min-w-16 min-h-16 rounded-xl">
            </div>
            <div className="bg-zinc-800 min-w-16 min-h-16 rounded-xl">
            </div>
        </div>
    </div>
}