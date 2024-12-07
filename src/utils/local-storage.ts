export const getLandingConfigKey = (formId: number) => {
  return `last-viewed-config-form-id-${formId}`;
};

export const clearQuestionnaireData = () => {
  Object.keys(localStorage).forEach((key) => {
    if (
      key.startsWith('questionnaire-responses-') ||
      key.startsWith('last-viewed-config-form-id')
    ) {
      localStorage.removeItem(key); // Remove the key
    }
  });
};
