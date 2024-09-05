import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import { FieldInformationService } from "@/services/fields.service";
import { FormField as Field } from "@/types/forms.types";
import { TextField } from "@mui/material";
import clsx from "clsx";
import React, { forwardRef } from "react";

type FormFieldProps = {
  formField: Field;
  defaultValue?: any;
  error?: string;
};

const FormField = forwardRef(
  (
    { formField, defaultValue, error }: FormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    // CALCULATED
    const defaultPlaceholder = "";
    const { fieldRefsByName, defaultValues } = useQuestionnaire();

    // DOM
    return (
      <div
        className={clsx("fmd-form-field flex flex-col", {
          hidden: formField.hidden,
        })}
      >
        {/* Label and Hint */}
        {formField.type !== "hidden" &&
          formField.label &&
          formField.label.length > 0 && (
            <label
              htmlFor={formField.name}
              className={clsx("fmd-label text-lg")}
            >
              {formField.label}
              {formField.hint && (
                <span title={formField.hint} className="fmd-icon fmd-hint">
                  ?
                </span>
              )}
            </label>
          )}

        {/* Field Types */}
        {formField.type === "display_only" && (
          <ParagraphText>{formField.value}</ParagraphText>
        )}

        {FieldInformationService.isShortText(formField.type) && (
          <TextField
            fullWidth={false}
            inputRef={ref}
            inputProps={{
              min: formField.min,
              minLength: formField.min_length,
              max: formField.max,
              maxLength: formField.max_length,
              defaultValue: defaultValue,
            }}
            required={formField.required}
            id={formField.name}
            name={formField.name}
            placeholder={formField.placeholder || defaultPlaceholder}
            className="fmd-input"
            type="text"
          />
        )}

        {FieldInformationService.isNumber(formField.type) && (
          <TextField
            fullWidth={false}
            inputRef={ref}
            inputProps={{
              min: formField.min,
              minLength: formField.min_length,
              max: formField.max,
              maxLength: formField.max_length,
              defaultValue: defaultValue,
            }}
            required={formField.required}
            id={formField.name}
            name={formField.name}
            placeholder={formField.placeholder || defaultPlaceholder}
            className="fmd-input"
            type="number"
          />
        )}

        {/* {FieldInformationService.isDate(formField.type) && (
        <div className="fmd-date-container">
          <input ref={ref} required={formField.required}
            id={formField.name}
            name={formField.name}
            placeholder={formField.placeholder || defaultPlaceholder}
            className="fmd-input"
            type="date"
          />
          <button
            disabled={formControl.disabled}
            onClick={selectToday}
            className="fmd-button"
            type="button"
          >
            Today
          </button>
        </div>
      )} */}

        {/* {FieldInformationService.isTime(formField.type) && (
        <div className="fmd-date-container">
          <input ref={ref} required={formField.required}
            id={formField.name}
            name={formField.name}
            value={formControl.value || ""}
            placeholder={formField.placeholder || defaultPlaceholder}
            className="fmd-input"
            type="time"
          />
          <button
            disabled={formControl.disabled}
            onClick={selectNow}
            className="fmd-button"
            type="button"
          >
            Now
          </button>
        </div>
      )} */}

        {/* {FieldInformationService.isDatetime(formField.type) && (
        <div className="fmd-date-container">
          <input ref={ref} required={formField.required}
            id={formField.name}
            name={formField.name}
            value={formControl.value || ""}
            placeholder={formField.placeholder || defaultPlaceholder}
            className="fmd-input"
            type="datetime-local"
          />
          <button
            disabled={formControl.disabled}
            onClick={selectTodayNow}
            className="fmd-button"
            type="button"
          >
            Now
          </button>
        </div>
      )} */}

        {FieldInformationService.isLongText(formField.type) && (
          <TextField
            component="textarea"
            id={formField.name}
            inputProps={{
              min: formField.min,
              minLength: formField.min_length,
              max: formField.max,
              maxLength: formField.max_length,
              defaultValue: defaultValue,
            }}
            name={formField.name}
            placeholder={formField.placeholder || defaultPlaceholder}
            className="fmd-input"
            rows={4}
          ></TextField>
        )}

        {FieldInformationService.isDropdown(formField.type) && (
          <select
            id={formField.name}
            name={formField.name}
            className="fmd-input"
            defaultValue={defaultValue}
          >
            {formField.placeholder && (
              <option value="" disabled selected>
                {formField.placeholder}
              </option>
            )}
            {formField.enum?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {FieldInformationService.isSearchableDropdown(formField.type) && (
          <div className="fmd-input">
            <datalist id="suggestions" style={{ display: "none" }}>
              {formField.enum?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </datalist>
            <input
              ref={ref}
              id={formField.name}
              required={formField.required}
              autoComplete="on"
              className="fmd-input"
              list="suggestions"
              defaultValue={defaultValue}
            />
          </div>
        )}

        {FieldInformationService.isCheckbox(formField.type) && (
          <div className="fmd-checkbox">
            {formField.enum?.map((option, index) => (
              <div key={index} className="fmd-checkbox">
                {!option.textbox && !option.hidden && (
                  <label className="fmd-checkbox-label">
                    {option.label}
                    <input
                      ref={ref}
                      id={formField.name}
                      required={formField.required}
                      name={formField.name}
                      value={option.value}
                      type="checkbox"
                      onChange={() => {}}
                      className="opacity-0 absolute pointer-events-none"
                      defaultChecked={!!defaultValue}
                    />
                    <span className="fmd-checkmark"></span>
                  </label>
                )}
              </div>
            ))}
          </div>
        )}

        {FieldInformationService.isRadio(formField.type) && (
          <div className="fmd-radio-parent flex flex-col gap-3">
            {(
              FieldInformationService.radios[formField.type]?.data ??
              formField.enum
            )?.map((option, index) => (
              <div key={index} className="fmd-radio">
                <label className="fmd-radio-label">
                  {option.label}
                  <input
                    ref={ref}
                    required={formField.required}
                    id={formField.name}
                    name={formField.name}
                    value={option.value}
                    type="radio"
                    onChange={() => {}}
                    className="opacity-0 absolute pointer-events-none"
                    defaultChecked={defaultValue === option.value}
                  />
                  <span className="fmd-radio-circle"></span>
                </label>
              </div>
            ))}
          </div>
        )}

        {FieldInformationService.isComplex(formField.type) && (
          <div id={formField.name} className="fmd-complex">
            {formField.internal_fields?.map((field, index) => (
              <FormField
                key={index}
                formField={field}
                defaultValue={defaultValues?.[field.name]}
              />
            ))}
          </div>
        )}

        {formField.type === "hidden" && (
          <input
            ref={ref}
            required={formField.required}
            value={formField.value}
            className="fmd-hidden"
            type="hidden"
          />
        )}

        {/* {FieldInformationService.isSlider(formField.type) && (
        <div>
          <input ref={ref} required={formField.required}
            id={formField.name}
            name={formField.name}
            value={formControl.value || 0}
            max={formField.max || 100}
            min={formField.min || 0}
            type="range"
          />
          {formControl.value || "0"}
        </div>
      )} */}

        {FieldInformationService.isLikert(formField.type) && (
          <table className="fmd-likert">
            <thead className="fmd-likert-row">
              <tr>
                <td className="fmd-likert-empty"></td>
                {formField.enum?.map((option, index) => (
                  <td key={index} className="fmd-likert-label">
                    {option.label}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody id={formField.name} className="fmd-likert-options">
              {formField.internal_fields?.map((field, index) => (
                <tr key={index}>
                  <td className="fmd-likert-label">{field.label}</td>
                  {formField.enum?.map((option, index) => (
                    <td key={index} className="fmd-likert-option">
                      <input
                        ref={(el: HTMLInputElement) => {
                          if (fieldRefsByName) {
                            fieldRefsByName.current[field.name] = el;
                          }
                        }}
                        required={formField.required}
                        id={field.name}
                        name={field.name}
                        value={option.value}
                        type="radio"
                        onChange={() => {}}
                        defaultValue={defaultValues?.[field.name]}
                      />
                      <span className="fmd-likert-circle"></span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Error Handling */}
        {formField.type !== "hidden" && (
          <div className="fmd-error-container">
            {formField.help_text && (
              <div className="fmd-help-text">{formField.help_text}</div>
            )}
            {!!error && (
              <ParagraphText color="red" className="fmd-error">
                {error}
              </ParagraphText>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default FormField;
