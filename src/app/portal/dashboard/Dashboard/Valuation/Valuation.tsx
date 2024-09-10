import React from "react";
import { useRouter } from "next/navigation";
import { useSessionUser } from "@/services/users.service";
import { routePaths } from "@/types/routes.enum";
import "./Valuation.scss";
import Link from "next/link";

const Valuation = () => {
  // HOOKS
  const router = useRouter();

  // QUERIES
  const { data: user } = useSessionUser();

  // CALCULATED
  const valuation = user?.company.valuation;
  const industry = user?.company.industry;

  return (
    <div className="flex h-full flex-col items-start justify-between gap-6 rounded-[20px] border border-solid border-bridge-gray-border bg-white p-6">
      <div className="flex flex-col gap-6">
        <p className="text-[20px] font-semibold">Valuation Estimate</p>
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px]">${valuation?.toLocaleString()}</h2>
          {/* Uncomment when needed */}
          {/* <p><strong>+ $30K</strong> Since last week</p> */}
        </div>
      </div>

      {/* Uncomment if needed */}
      {/* <div className="flex flex-col gap-1">
        <p className="text-sm">95% Confidence:</p>
        <p className="text-sm"><strong>$5,242,000 - $7,242,000</strong></p>
      </div> */}

      <div className="flex w-full flex-col gap-4">
        <p className="text-sm font-medium text-gray-500">
          * based on reported revenue and an industry multiple of{" "}
          {industry?.revenue_multiple} ({industry?.name?.toLowerCase()})
        </p>
        <div className="quadruple-gradient h-1 w-full rounded-full"></div>
        <span className="flex items-center gap-6">
          <Link
            className="cursor-pointer text-sm font-semibold text-bridge-dark-purple"
            href={routePaths.VALUATION}
          >
            Edit revenue
          </Link>
          <Link
            className="cursor-pointer text-sm font-semibold text-bridge-dark-purple"
            href={routePaths.SETTINGS}
          >
            Edit industry
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Valuation;
