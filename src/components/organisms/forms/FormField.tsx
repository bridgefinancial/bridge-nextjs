/* eslint-disable react/display-name */
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import { FieldInformationService } from "@/services/fields.service";
import { colors } from "@/theme/theme";
import { FieldType } from "@/types/forms.enum";
import { FormField as Field } from "@/types/forms.types";
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import clsx from "clsx";
import React, { forwardRef, useState } from "react";

type FormFieldProps = {
  formField: Field;
  error?: string;
};

const FormField = forwardRef(
  (
    { formField, error }: FormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    // STATE
    const [notSure, setNotSure] = useState<boolean>(false);
    // CALCULATED
    const defaultPlaceholder = "";
    const {
      fieldRefsByName,
      fieldErrorsByName,
      formValues,
      handleChange,
      checkConditions,
    } = useQuestionnaire();

    // DOM
    return (
      <div
        className={clsx("fmd-form-field flex flex-col transition-all", {
          hidden: formField.hidden || !checkConditions(formField.conditions),
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

        {FieldInformationService.isDropdown(formField.type) && (
          <div className="shrink-0">
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel
                id={`dropdown-label-${formField.name}`}
                sx={{ color: colors.gray600 }}
              >
                {formField.label || formField.placeholder}
              </InputLabel>
              <Select
                labelId={`dropdown-label-${formField.name}`}
                id={`select-${formField.name}`}
                value={formValues[formField.name]}
                label={formField.label || formField.placeholder}
                onChange={(e) => {
                  handleChange(formField.name, e.target.value);
                }}
                placeholder={formField.placeholder}
                required={formField.required}
                inputProps={{ ref: ref, id: formField.name }}
              >
                {(
                  formField.enum ??
                  FieldInformationService.getDefaultSelections(formField) ??
                  []
                ).map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
                      className="opacity-0 absolute pointer-events-none"
                      checked={formValues[formField.name] === option.value}
                      onChange={() => {
                        handleChange(formField.name, option.value);
                      }}
                    />
                    <span className="fmd-checkmark" />
                  </label>
                )}
              </div>
            ))}
          </div>
        )}

        {FieldInformationService.isRadio(formField.type) && (
          <div className="fmd-radio-parent flex flex-wrap gap-2">
            {(
              FieldInformationService.radios[formField.type]?.data ??
              formField.enum
            )?.map((option, index) => (
              <div key={index} className="fmd-radio box-border">
                <label className="fmd-radio-label">
                  {option.label}
                  <input
                    ref={ref}
                    required={formField.required}
                    id={formField.name}
                    name={formField.name}
                    value={option.value}
                    type="radio"
                    checked={formValues[formField.name] === option.value}
                    onChange={() => {
                      handleChange(formField.name, option.value);
                    }}
                    className="opacity-0 absolute pointer-events-none"
                  />
                  <span className="fmd-radio-circle" />
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
                error={fieldErrorsByName[field.name]}
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
                <td className="fmd-likert-empty" />
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
                        checked={formValues[field.name] === option.value}
                        onChange={() => {
                          handleChange(field.name, option.value);
                        }}
                      />
                      <span className="fmd-likert-circle" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {FieldInformationService.isAddress(formField.type) &&
          !!formField.internal_fields && (
            <div className="flex flex-col gap-4">
              <FormField
                formField={formField.internal_fields?.[0]}
                ref={(el: HTMLInputElement) => {
                  if (fieldRefsByName && formField.internal_fields?.[0]?.name) {
                    fieldRefsByName.current[
                      formField.internal_fields?.[0]?.name
                    ] = el;
                  }
                }}
                error={fieldErrorsByName[formField.internal_fields?.[0].name]}
              />
              <div className="flex items-center justify-start gap-4">
                {formField.internal_fields.slice(1).map((field) => {
                  return (
                    <FormField
                      formField={field}
                      key={field.name}
                      ref={(el: HTMLInputElement) => {
                        if (fieldRefsByName) {
                          fieldRefsByName.current[field.name] = el;
                        }
                      }}
                      error={fieldErrorsByName[field.name]}
                    />
                  );
                })}
              </div>
            </div>
          )}

        {FieldInformationService.isSlider(formField.type) && (
          <Slider
            size="small"
            min={formField.min}
            max={formField.max}
            value={formValues[formField.name]}
            onChange={(e, value) => {
              handleChange(formField.name, value);
            }}
            disabled={notSure}
          ></Slider>
        )}

        <div className="flex items-center gap-6">
          {FieldInformationService.isShortText(formField.type) && (
            <TextField
              fullWidth={formField.type === FieldType.TextFullWidth}
              inputRef={ref}
              inputProps={{
                min: formField.min,
                minLength: formField.min_length,
                max: formField.max,
                maxLength: formField.max_length,
              }}
              required={formField.required}
              id={formField.name}
              name={formField.name}
              placeholder={formField.placeholder || defaultPlaceholder}
              className="fmd-input"
              type="text"
              value={formValues[formField.name]}
              onChange={(e) => {
                handleChange(formField.name, e.target.value);
              }}
              disabled={notSure}
            />
          )}

          {FieldInformationService.isNumber(formField.type) && (
            <TextField
              fullWidth={false}
              inputRef={ref}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {FieldInformationService.getStartInputAdornment(
                      formField.type
                    )}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {FieldInformationService.getEndInputAdornment(
                      formField.type
                    )}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: formField.min,
                minLength: formField.min_length,
                max: formField.max,
                maxLength: formField.max_length,
              }}
              required={formField.required}
              id={formField.name}
              name={formField.name}
              placeholder={formField.placeholder || defaultPlaceholder}
              className="fmd-input"
              value={formValues[formField.name] ?? ""}
              onChange={(e) => {
                if (
                  FieldInformationService.isValidUserInput(
                    formField.type,
                    e.target.value
                  )
                ) {
                  handleChange(
                    formField.name,
                    FieldInformationService.formatNumberInput(e.target.value)
                  );
                }
              }}
              disabled={notSure}
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
              id={formField.name}
              inputProps={{
                min: formField.min,
                minLength: formField.min_length,
                max: formField.max,
                maxLength: formField.max_length,
              }}
              name={formField.name}
              placeholder={formField.placeholder || defaultPlaceholder}
              className="fmd-input"
              rows={4}
              multiline={true}
              value={formValues[formField.name]}
              onChange={(e) => {
                handleChange(formField.name, e.target.value);
              }}
              disabled={notSure}
              inputRef={ref}
              fullWidth
            />
          )}
          {FieldInformationService.isSlider(formField.type) && (
            <div>
              <TextField
                sx={{ width: 100 }}
                fullWidth={false}
                inputRef={ref}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {FieldInformationService.getStartInputAdornment(
                        formField.type
                      )}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {FieldInformationService.getEndInputAdornment(
                        formField.type
                      )}
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  min: formField.min,
                  max: formField.max,
                }}
                required={formField.required}
                id={formField.name}
                name={formField.name}
                placeholder={formField.placeholder || defaultPlaceholder}
                className="fmd-input"
                value={notSure ? "" : (formValues[formField.name] ?? "")}
                onChange={(e) => {
                  if (
                    FieldInformationService.isValidUserInput(
                      formField.type,
                      e.target.value
                    )
                  ) {
                    handleChange(
                      formField.name,
                      e.target.value ? parseInt(e.target.value) : 0
                    );
                  }
                }}
                disabled={notSure}
              />
            </div>
          )}
          {/* Not sure option */}
          {!!formField.not_sure && (
            <div className="flex items-center justify-start">
              <Checkbox
                checked={notSure}
                onChange={(e) => {
                  setNotSure(e.target.checked);
                  if (e.target.checked) {
                    handleChange(formField.name, "Not sure");
                  } else {
                    handleChange(formField.name, "");
                  }
                }}
              />
              <ParagraphText fontWeight={700}>Not sure</ParagraphText>
            </div>
          )}
        </div>

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
