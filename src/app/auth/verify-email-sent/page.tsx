"use client";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import CardWithTitle from "@/components/molecules/cards/CardWithTitle";

const VerifyEmailSent = () => {
  return (
    <CardWithTitle titleProps={{ text: "Verify Email" }}>
      <ParagraphText className="text-center">
        Please follow the link that was sent to your email address in order to
        verify your email.
      </ParagraphText>
    </CardWithTitle>
  );
};

export default VerifyEmailSent;
