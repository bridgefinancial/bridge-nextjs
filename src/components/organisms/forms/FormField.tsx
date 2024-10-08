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
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

type FormFieldProps = {
  formField: Field;
  error?: string;
};

const FormField = forwardRef(
  (
    { formField, error }: FormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>,
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
          <ParagraphText>{formField.value as any}</ParagraphText>
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
                value={formValues[formField.name] ?? ""}
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
                  <MenuItem
                    key={index as number}
                    value={option.value as string}
                  >
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
                <option key={index} value={option.value as string}>
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
          <div
            className={clsx("fmd-checkbox-parent", {
              "flex flex-wrap gap-2":
                formField.type !== FieldType.Checkbox9Grid,
              "grid grid-cols-3 gap-4":
                formField.type === FieldType.Checkbox9Grid,
            })}
          >
            {formField.enum?.map((option, index) => {
              const handleClick = (e: any) => {
                if (e.target.tagName === "INPUT") {
                  return;
                }
                const currentValue: string[] | undefined =
                  formValues[formField.name];
                if (!currentValue) {
                  handleChange(formField.name, [option.value]);
                } else if (currentValue.includes(option.value as string)) {
                  handleChange(
                    formField.name,
                    currentValue.filter((v) => v !== option.value),
                  );
                } else {
                  handleChange(formField.name, [...currentValue, option.value]);
                }
              };
              return (
                <div
                  key={`${index}-${formField.name}`}
                  className={clsx("fmd-checkbox box-border cursor-pointer", {
                    "flex flex-col items-start justify-start w-full":
                      formField.type === FieldType.Checkbox9Grid,
                    "flex items-center justify-center":
                      formField.type !== FieldType.Checkbox9Grid,
                  })}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  {option.iconUrl && (
                    <div className="px-6 py-3">
                      <Image
                        src={option.iconUrl}
                        alt={`option-${formField.name}-icon`}
                        className="object-contain"
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                  {formField.type !== FieldType.Checkbox9Grid ? (
                    <div className="px-4">
                      <FormControlLabel
                        checked={
                          !!formValues[formField.name]?.includes(option.value)
                        }
                        control={<Checkbox />}
                        label={option.label}
                        name={option.value}
                        value={option.value}
                        className="cursor-pointer"
                      ></FormControlLabel>
                    </div>
                  ) : (
                    <>
                      <label className="fmd-checkbox-label cursor-pointer">
                        {option.label}
                        <span className="fmd-checkmark" />
                      </label>
                    </>
                  )}
                  <input
                    name={option.value as string}
                    value={option.value as string}
                    type="checkbox"
                    checked={
                      !!formValues[formField.name]?.includes(option.value)
                    }
                    className="opacity-0 absolute pointer-events-none"
                  />
                </div>
              );
            })}
            <input
              ref={ref}
              id={formField.name}
              required={formField.required}
              name={formField.name}
              value={formValues[formField.name]}
              hidden={true}
              onChange={() => {}}
              className="opacity-0 absolute pointer-events-none"
            />
          </div>
        )}

        {FieldInformationService.isRadio(formField.type) && (
          <div
            className={clsx("fmd-radio-parent", {
              "flex flex-wrap gap-2":
                formField.type !== FieldType.Radio9Grid &&
                formField.type !== FieldType.RadioLikert,
              "grid grid-cols-3 gap-4": formField.type === FieldType.Radio9Grid,
              "flex gap-1 justify-center flex-nowrap":
                formField.type === FieldType.RadioLikert,
            })}
          >
            {(
              FieldInformationService.radios[formField.type]?.data ??
              formField.enum
            )?.map((option, index) => (
              <div
                key={index}
                className={clsx("box-border cursor-pointer", {
                  "fmd-radio": formField.type !== FieldType.RadioLikert,
                  "flex flex-col gap-4 items-start justify-start":
                    formField.type === FieldType.Radio9Grid,
                  "flex items-center justify-center":
                    formField.type !== FieldType.Radio9Grid,
                })}
                onClick={() => {
                  handleChange(formField.name, option.value);
                }}
              >
                {option.iconUrl && (
                  <div className="px-6 py-3">
                    <Image
                      src={option.iconUrl}
                      alt={`option-${formField.name}-icon`}
                      className="object-contain"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
                {formField.type === FieldType.RadioLikert ? (
                  <FormControlLabel
                    checked={formValues[formField.name] === option.value}
                    control={<Radio readOnly />}
                    label={option.label}
                    name={option.value}
                    value={option.value}
                    className="cursor-pointer"
                    classes={{ labelPlacementTop: "text-center" }}
                    labelPlacement="top"
                  ></FormControlLabel>
                ) : (
                  <label className="fmd-radio-label cursor-pointer">
                    {option.label}
                    <span className="fmd-radio-circle" />
                  </label>
                )}
                <input
                  ref={ref}
                  required={formField.required}
                  id={formField.name}
                  name={formField.name}
                  value={option.value}
                  type="radio"
                  checked={formValues[formField.name] === option.value}
                  className="opacity-0 absolute pointer-events-none"
                />
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
                ref={(el: HTMLInputElement) => {
                  if (fieldRefsByName) {
                    fieldRefsByName.current[field.name] = el;
                  }
                }}
              />
            ))}
          </div>
        )}

        {formField.type === "hidden" && (
          <input
            ref={ref}
            required={formField.required}
            value={formField.value as string}
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
          <div className="flex flex-col gap-8">
            {formField.internal_fields?.map((f) => {
              return (
                <FormField
                  key={f.name}
                  formField={{
                    ...f,
                    type: FieldType.RadioLikert,
                    enum: formField.enum,
                  }}
                  error={fieldErrorsByName[f.name]}
                  ref={(el: HTMLInputElement) => {
                    if (fieldRefsByName) {
                      fieldRefsByName.current[f.name] = el;
                    }
                  }}
                />
              );
            })}
          </div>
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

        {/* Slider */}
        {FieldInformationService.isSlider(formField.type) && (
          <Slider
            size="small"
            min={formField.min}
            max={formField.max}
            value={formValues[formField.name] ?? 0}
            onChange={(e, value) => {
              handleChange(formField.name, value);
            }}
            disabled={notSure}
            valueLabelDisplay="auto"
          />
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
              value={formValues[formField.name] ?? ""}
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
                      formField.type,
                    )}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {FieldInformationService.getEndInputAdornment(
                      formField.type,
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
                    e.target.value,
                  )
                ) {
                  handleChange(
                    formField.name,
                    FieldInformationService.formatNumberInput(e.target.value),
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
              inputRef={ref}
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
              value={formValues[formField.name] ?? ""}
              onChange={(e) => {
                handleChange(formField.name, e.target.value);
              }}
              disabled={notSure}
              fullWidth={true}
            />
          )}

          {/* Slider Text Field */}
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
                        formField.type,
                      )}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {FieldInformationService.getEndInputAdornment(
                        formField.type,
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
                      e.target.value,
                    )
                  ) {
                    handleChange(
                      formField.name,
                      e.target.value ? parseInt(e.target.value) : 0,
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
  },
);

export default FormField;
