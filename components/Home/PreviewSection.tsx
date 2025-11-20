const PreviewSection = () => {
  return (
    <section className="relative z-10 mt-16 w-full mb-5">
      <div className="mx-auto max-w-6xl space-y-6 rounded-3xl border border-slate-200 bg-white/70 px-6 py-8 shadow-2xl shadow-emerald-400/10 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500 dark:text-violet-400">
            Instant Preview
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-neutral-100">
            See your raster input and the SVG output in one glance
          </p>
          <p className="text-sm text-slate-600 dark:text-neutral-400">
            Drop any PNG, JPG or other raster image and watch the converter
            render the matching SVG on the right.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-zinc-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-emerald-100 to-white ring-1 ring-emerald-200 dark:from-violet-900/30 dark:to-purple-900/60 dark:ring-violet-500/40">
              <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-500 dark:text-neutral-400">
                <span className="text-lg font-semibold text-slate-600 dark:text-neutral-100">
                  Input Placeholder
                </span>
                <span className="text-xs uppercase tracking-[0.3em]">
                  PNG / JPG
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm text-slate-600 dark:text-neutral-400">
              <p className="font-semibold text-slate-900 dark:text-neutral-100">
                Raster Image
              </p>
              <p className="text-xs text-slate-500 dark:text-neutral-500">
                This area will show the file you upload before conversion.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-slate-900 to-zinc-900 shadow-inner shadow-black/30">
              <div className="flex h-full flex-col items-center justify-center gap-2 text-emerald-400">
                <span className="text-lg font-semibold">
                  Output Placeholder
                </span>
                <span className="text-xs uppercase tracking-[0.3em]">
                  SVG Vector
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm text-slate-600 dark:text-neutral-400">
              <p className="font-semibold text-slate-900 dark:text-neutral-100">
                Editable SVG
              </p>
              <p className="text-xs text-slate-500 dark:text-neutral-500">
                The converted vector will appear here with clean paths.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
