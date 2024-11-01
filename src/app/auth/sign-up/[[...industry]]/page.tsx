'use client';

import { SignUpRequest, useLoginUser } from '@/services/users.service';
import { AuthRoutes, QuestionnaireRoutes } from '@/types/routes.enum';
import { useRouter, useSearchParams } from 'next/navigation';
import SignUpForm from '../SignUpForm';

const SignUpPage = ({ params }: { params: { industry: string[] } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { industry } = params;
  const { mutateAsync: login } = useLoginUser();

  const handleRedirectAfterSignUp = (formValues: SignUpRequest) => {
    if (process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION) {
      router.push(AuthRoutes.VERIFY_EMAIL_SENT);
    } else {
      login(
        { email: formValues.email, password: formValues.password },
        {
          onSuccess: () => {
            router.push(
              `${QuestionnaireRoutes.VALUATION}?${searchParams.toString()}`
            );
          },
        }
      );
    }
  };

  return (
    <SignUpForm
      industryName={industry ? industry[0] : undefined}
      onSignUp={handleRedirectAfterSignUp}
      cardContainerStyles={{
        boxShadow: 0,
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default SignUpPage;
