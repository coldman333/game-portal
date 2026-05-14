import React from "react";

import type { Page } from "@/payload-types";

import RichText from "@/components/RichText";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      richText?: never;
      button?: string | null;
    }
  | (Omit<Page["hero"], "richText"> & {
      children?: never;
      richText?: Page["hero"]["richText"];
      button?: string | null;
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  button,
}) => {
  return (
    <div className="mt-16 mb-28">
      <div className="max-w-full h-fit flex-col flex justify-center items-center gap-8">
        <div className="justify-self-center max-w-fit text-orange-400 py-4 px-6 bg-cyan-500/10 rounded-full outline outline-1 outline-offset-[-1px] outline-cyan-500/20">
          {button}
        </div>
        <div className="max-w-[42rem]">
          {children ||
            (richText && <RichText data={richText} enableGutter={false} />)}
        </div>
      </div>
    </div>
  );
};
