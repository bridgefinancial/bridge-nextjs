import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import { ArrowForward } from "@mui/icons-material";
import TitleText from "@/components/atoms/typography/TitleText";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { Industry } from "@/types/industries.types";
import { Box } from "@mui/material";
import GradientBox from "@/components/atoms/containers/GradientBox";
import { colors } from "@/theme/theme";

// Define the default props for the industry valuation
const defaultIndustry: Industry = {
  id: "1",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  name: "Chiropractics",
  revenue_multiple: 0.8,
  ebitda_multiple: 2.67,
  median_sale_price: 160000,
};

// Define the component props interface
interface ValuationEstimateProps {
  industry?: Industry;
}

// Define the Valuation Estimate Component
export const ValuationEstimate: React.FC<ValuationEstimateProps> = ({
  industry = defaultIndustry,
}) => {
  // Calculate the valuation based on the industry multiples
  const valuation = industry.median_sale_price * industry.revenue_multiple;
  const industryMultiple = industry.revenue_multiple.toFixed(2);

  return (
    <div className="w-full flex items-center justify-center pt-16 flex-col gap-16">
      {/* Valuation Box */}
      <GradientBox
        containerStyle={{ padding: 0.5, borderRadius: 22, maxWidth: "776px" }}
        direction={"234.13deg"}
        colors={[
          "#fb9f1e 5.37%",
          "#a395f7 30.76%",
          "#6ba0f1 69.06%",
          "#6ba0f1 69.06%",
          "#bce762 91.78%",
        ]}
      >
        <div className="gradient-border p-[2px]">
          <div className="bg-white py-10 px-10 flex flex-col items-center gap-8 rounded-[20px]">
            <div className="flex flex-col gap-4 text-center  ">
              <TitleText
                sx={{ fontSize: "30px", lineHeight: "40px", marginBottom: 0 }}
                component={"h1"}
              >
                We estimate your business is worth
              </TitleText>
              <TitleText
                sx={{ fontSize: "60px", lineHeight: "75px" }}
                component={"h2"}
              >
                ${valuation.toLocaleString()}{" "}
                {/* Convert number to currency format */}
              </TitleText>
              <ParagraphText
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "21px",
                  maxWidth: 300,
                  textAlign: "center",
                  margin: "auto",
                  color: "#757575",
                }}
              >
                This valuation is based on your reported revenue and industry
                multiple of {industryMultiple}
              </ParagraphText>
            </div>
          </div>
        </div>
      </GradientBox>

      {/* Call to Action Box */}
      <Box
        sx={{
          maxWidth: "500px",
        }}
        className="flex flex-col items-center text-center gap-4"
      >
        <TitleText sx={{ fontSize: "24px", fontWeight: 600 }}>
          Ready to increase your valuation?
        </TitleText>
        <ParagraphText
          sx={{
            marginBottom: 0.5,
            color: "#757575",
            fontSize: "16px",
            lineHeight: "21px",
          }}
        >
          Schedule a meeting with one of our business advisors who specializes
          in the chiropractic market.
        </ParagraphText>
        <a
          href="https://bridge.financial/contact-us/"
          className="mat-flat-button text-white bg-primary px-4 py-2 rounded-md flex items-center gap-2"
        >
          <ContainedButton
            text={"Schedule Meeting"}
            backgroundColor={colors.bridgeDarkPurple}
            endIcon={<ArrowForward />}
          />
        </a>
      </Box>
    </div>
  );
};