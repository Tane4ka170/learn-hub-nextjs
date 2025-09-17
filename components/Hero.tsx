import React from "react";

function Hero() {
  return (
    <div className="relative h-[45vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 dark:from-white/30 dark:to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/5" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text text-transparent">
            Broaden your knowledge through our courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlock endless learning opportunities with our carefully designed
            courses. Gain insights from industry experts and elevate your skills
            to new heights.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
