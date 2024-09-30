import { FieldType } from "@/types/forms.enum";
import { FormidableForm } from "@/types/forms.types";

export const VALUATION_FORM_DEFINITION: FormidableForm = {
  id: 8,
  created_at: "2024-09-14T11:21:59.524282-06:00",
  updated_at: "2024-09-15T23:11:04.635250-06:00",
  name: "Chiropractic Valuation",
  slug: "chiropractic-valuation",
  review: false,
  intro: {
    imageSrc: "/assets/images/man-at-computer.png",
    heading: "Let's determine your business's value",
    subheading:
      "First, we have some basic questions to ask first related to your operations and finances.",
    welcomeHeading: "Welcome",
    timeEstimate: "3-5 minutes",
    buttonText: "Get started",
  },
  definition: {
    id: 8,
    name: "Chiropractic Valuation",
    pages: [
      {
        name: "location",
        fields: [
          {
            id: 123,
            min: 0,
            name: "years_in_operation",
            type: FieldType.PositiveInteger,
            label: "How long has your business been operating?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
            placeholder: "Years in operation",
          },
          {
            id: 134,
            enum: [
              { label: "Rent", value: "rent", textbox: false, placeholder: "" },
              { label: "Own", value: "own", textbox: false, placeholder: "" },
              {
                label: "I have none",
                value: "none",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "real_estate_ownership_type",
            type: FieldType.Radio,
            label: "Do you rent or own your business property?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 135,
            name: "annual_rent",
            type: FieldType.USD,
            label: "What is the current annual rent?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "rent",
                operator: "equal",
                dependant_on: {
                  name: "real_estate_ownership_type",
                  page_name: "location",
                },
              },
            ],
          },
          {
            id: 136,
            name: "real_estate_value",
            type: FieldType.USD,
            label: "What is the appraised or estimated value of the property?",
            order: 3,
            hidden: false,
            add_more: false,
            not_sure: true,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "own",
                operator: "equal",
                dependant_on: {
                  name: "real_estate_ownership_type",
                  page_name: "location",
                },
              },
            ],
          },
          {
            id: 137,
            name: "inventory_and_equipment_value",
            type: FieldType.USD,
            label:
              "What is the appraised or estimated value of the equipment and inventory that you own?",
            order: 4,
            hidden: false,
            add_more: false,
            not_sure: true,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 138,
            name: "other_investments",
            type: FieldType.YesNo,
            label: "Do you own any other investments related to the business?",
            order: 5,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 139,
            name: "other_investments_value",
            type: FieldType.USD,
            label: "What is the current value of these investments?",
            order: 6,
            hidden: false,
            add_more: false,
            not_sure: true,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: {
                  name: "other_investments",
                  page_name: "location",
                },
              },
            ],
          },
        ],
        header: "Location & Operations",
      },
      {
        name: "financial",
        fields: [
          {
            id: 124,
            name: "annual_revenue",
            type: FieldType.USD,
            label:
              "What was your business's gross revenue for the most recent year? An estimate is fine.",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 140,
            name: "knows_ebitda",
            type: FieldType.YesNo,
            label:
              "Do you know your Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 141,
            name: "ebitda",
            type: FieldType.USD,
            label: "What was your EBITDA for the most recent year?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: { name: "knows_ebitda", page_name: "financial" },
              },
            ],
          },
          {
            id: 142,
            name: "net_profit",
            type: FieldType.USD,
            label:
              "What was your net profit for the most recent year? An estimate is fine.",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Financial Information",
      },
      {
        name: "debt",
        fields: [
          {
            id: 143,
            name: "total_debt",
            type: FieldType.USD,
            label:
              "What is the total amount of debt and loan obligations your business currently holds? An estimate is fine.",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 144,
            name: "has_other_debts",
            type: FieldType.YesNo,
            label:
              "Are there any other financial obligations or liabilities that could affect your business’s valuation? (e.g., outstanding taxes, pending lawsuits)",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 145,
            name: "other_debts_description",
            type: FieldType.LongText,
            label: "Could you describe your financial obligations?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: { name: "has_other_debts", page_name: "debt" },
              },
            ],
          },
        ],
        header: "Debt & Obligations",
      },
    ],
    review: false,
  },
};

export const RECOMMENDATION_FORM_DEFINITION: FormidableForm = {
  id: 3,
  created_at: "2024-07-27T22:51:09.478783-06:00",
  updated_at: "2024-08-12T16:43:16.522528-06:00",
  name: "Onboarding Survey",
  slug: "onboarding-survey",
  review: false,
  definition: {
    id: 3,
    name: "Onboarding Survey",
    pages: [
      {
        name: "product_market_fit",
        fields: [
          {
            id: 68,
            max: 100,
            min: 0,
            name: "customer_affinity_percentage",
            type: FieldType.PositiveInteger,
            label:
              "What percentage of your customers would be *very disappointed* if you were to close your business?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 69,
            max: 100,
            min: 0,
            name: "yearly_retention_rate",

            type: FieldType.PositiveInteger,
            label:
              "What % of your customers continue purchasing your product or service for more than a year?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Product-Market Fit",
      },
      {
        name: "position_clarity",
        fields: [
          {
            id: 70,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "position_clarity_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 71,
                name: "understands_customer",

                type: FieldType.Radio,
                label:
                  "I have a clear understanding of my ideal customer profile, including their values, needs, and pain points?",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 72,
                name: "understands_landscape",

                type: FieldType.Radio,
                label:
                  "I have a clear understanding of the unique value my product or service offers to customers and how my products and services are differentiated from my competitors.",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 73,
                name: "good_positioning",

                type: FieldType.Radio,
                label:
                  "My customers have a clear understanding of the unique value of my products or services.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 74,
                name: "systematic_pricing",

                type: FieldType.Radio,
                label:
                  "My company used a systematic approach to determining pricing.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Position Clarity",
      },
      {
        name: "pricing_and_bundling",
        fields: [
          {
            id: 75,
            min: 0,
            name: "average_ticket_price",

            type: FieldType.PositiveInteger,
            label: "What is your average ticket price? (It's OK to estimate)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 76,
            name: "offers_payment_plans",

            type: FieldType.YesNo,
            label: "Do you offer customers any form of payment plans?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Pricing & Bundling",
      },
      {
        name: "online_presence",
        fields: [
          {
            id: 77,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "has_website",

            type: FieldType.Radio,
            label: "Do you have a website?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 78,
            name: "web_address",

            type: FieldType.URL,
            label: "What is your web address?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: {
                  name: "has_website",
                  page_name: "online_presence",
                },
              },
            ],
          },
          {
            id: 79,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "has_blog",

            type: FieldType.Radio,
            label: "Does your company have a blog?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 80,
            name: "blog_address",

            type: FieldType.URL,
            label: "What is your blog web address?",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: {
                  name: "has_blog",
                  page_name: "online_presence",
                },
              },
            ],
          },
        ],
        header: "Online Presence",
      },
      {
        name: "digital_strategy",
        fields: [
          {
            id: 81,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "digital_strategy_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 82,
                name: "website_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company website is effective at generating leads for my business.",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 83,
                name: "blog_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company blog does a good job of raising brand awareness and generating leads.",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 84,
                name: "social_media_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of raising brand awareness and generating leads through social media.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 85,
                name: "review_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of requesting online reviews from happy customers.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 86,
                name: "review_responsiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job monitoring and replying to online reviews.",
                order: 4,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 87,
                name: "digital_ad_effectiveness",

                type: FieldType.Radio,
                label: "My company has an effective digital ad strategy.",
                order: 5,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 88,
                name: "email_marketing_effectiveness",

                type: FieldType.Radio,
                label: "My company runs effective email marketing campaigns.",
                order: 6,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 89,
                name: "affiliate_marketing_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company has an effective affilite marketing program for generating online leads and sales.",
                order: 7,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Digital Strategy",
      },
      {
        name: "leads_management",
        fields: [
          {
            id: 90,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "leads_management_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 91,
                name: "partnership_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company makes good use of partnerships, distributors, and other sales channels to generate leads and sales.",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 120,
                name: "traditional_marketing_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job using traditional marketing strategies such as community events, trade shows, sponsorships, promotions, coupons, traditional advertising (print, radio, billboards, etc), direct mail, and cold calling to raise awareness of company products and services.",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 92,
                name: "lead_tracking_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of saving contact info and other applicable details for new leads.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 93,
                name: "lead_prioritization_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of prioritizing high-quality / high-fit leads.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 94,
                name: "sales_conversion_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of converting leads into new sales.",
                order: 4,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Leads Management",
      },
      {
        name: "business_systems",
        fields: [
          {
            id: 95,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "business_systems_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 96,
                name: "customized_comms",

                type: FieldType.Radio,
                label:
                  "My company's interactions and communication with prospective customers is customized based on their preferences, behavior, and past interactions.",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 97,
                name: "consistent_delivery",

                type: FieldType.Radio,
                label:
                  "My company does a good job of ensuring that the promised value and benefits of my products and services are delivered across all customer touch points (physical space, the front desk, the solution delivery, and followups).",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 98,
                name: "meets_commitments",

                type: FieldType.Radio,
                label:
                  "My company consistently meets our commitments to our customers.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 99,
                name: "commitment_tracking",

                type: FieldType.Radio,
                label:
                  "My company has good, effective systems in place to track and fulfill our promises to our customers.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 100,
                name: "spend_management",

                type: FieldType.Radio,
                label: "My company does a good job managing our spending.",
                order: 4,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 101,
                name: "cash_reserve_adequacy",

                type: FieldType.Radio,
                label:
                  "My company does a good job maintaing adequate cash reserves.",
                order: 5,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 102,
                name: "good_collections",

                type: FieldType.Radio,
                label:
                  "My company does a good job ensuring that we are paid for products and services delivered.",
                order: 6,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
            ],
          },
        ],
        header: "Business Systems",
      },
      {
        name: "employee_efficiency",
        fields: [
          {
            id: 104,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "uses_productivity_software",

            type: FieldType.Radio,
            label:
              "Does your company use software to track and improve employee productivity?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 105,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "uses_bi_software",

            type: FieldType.Radio,
            label:
              "My business uses systems to gain insights business and customer data (Business Intellegence Software).",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 106,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "fraud_prevention",

            type: FieldType.Radio,
            label:
              "Does your company have good processes and/or software in place to prevent fraud and ensure security?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 117,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "manage_expenditures",

            type: FieldType.Radio,
            label:
              "My business does a good job at managing and categorizing expenditures",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 103,
            name: "num_employees",

            type: FieldType.PositiveInteger,
            label:
              "About how many employees do you have? (It is OK to estimate)",
            order: 4,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Employee Efficiency",
      },
      {
        name: "process_and_training",
        fields: [
          {
            id: 107,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "has_org_chart",
            type: FieldType.Radio,
            label: "Does your company have an up-to-date org chart?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 108,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "process_likert",
            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 110,
                name: "processes_and_procedures",
                type: FieldType.Radio,
                label:
                  "My company's processes and procedures are standardized and well documented, and we do a good job of keeping that documentation up-to-date.",
                order: 0,
                hidden: false,
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 109,
                name: "emps_understand_roles",
                type: FieldType.Radio,
                label:
                  "Everyone at my company clearly understands their roles and responsibilities.",
                order: 1,
                hidden: false,
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 111,
                name: "adequate_training",
                type: FieldType.Radio,
                label:
                  "My company is effective at ensuring that staff follows standards and procedures.",
                order: 2,
                hidden: false,
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Process & Training",
      },
    ],
    review: false,
  },
};

export const RECOMMENDATION_GENERAL_INFO_FORM_DEFINITION: FormidableForm = {
  id: 9,
  created_at: "2024-09-30T16:30:51.328167-06:00",
  updated_at: "2024-09-30T16:44:28.904841-06:00",
  name: "General Information",
  slug: "general-information",
  review: false,
  definition: {
    id: 9,
    name: "General Information",
    pages: [
      {
        name: "Business Profile",
        fields: [
          {
            id: 146,
            name: "business_description",
            page: "Business Profile",
            type: FieldType.LongText,
            label:
              "Please provide a brief description of what your business does",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 147,
            name: "business_owners_count",
            page: "Business Profile",
            type: FieldType.PositiveInteger,
            label: "How many business owners are there?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 148,
            name: "employees_count",
            page: "Business Profile",
            type: FieldType.PositiveInteger,
            label: "How many employees do you have?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 149,
            name: "business_address",
            page: "Business Profile",
            type: FieldType.Address,
            label: "What is your business address?",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Business Profile",
      },
      {
        name: "Economics",
        fields: [
          {
            id: 158,
            max: 100,
            min: 0,
            name: "revenue_growth_rate",
            page: "Economics",
            type: FieldType.PositiveInteger,
            label: "What is your revenue growth rate?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 159,
            name: "has_business_loans",
            page: "Economics",
            type: FieldType.YesNo,
            label: "Do you have any business loans?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 160,
            name: "business_loans_owed",
            page: "Economics",
            type: FieldType.PositiveInteger,
            label:
              "What is the total amount owed, or the remaining balance on your business loans?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Economics",
      },
      {
        name: "Business Goals",
        fields: [
          {
            id: 161,
            enum: [
              {
                label: "Grow new customers",
                value: "new_customers",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Customer retention",
                value: "customer_retention",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Expand product/service offerings",
                value: "expand_product",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Digital marketing strategy",
                value: "digital_marketing",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Operational efficiency",
                value: "operations",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Profit margin",
                value: "profit",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Acquire a business",
                value: "buy",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Sell my business",
                value: "sell",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Other",
                value: "other",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "goals",
            page: "Business Goals",
            type: FieldType.Checkbox,
            label:
              "What are your business goals in the next 3-5 years? (Select all that apply)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 162,
            name: "other_goals",
            page: "Business Goals",
            type: FieldType.LongText,
            label: "Other, please specify: (Optional)",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Business Goals",
      },
      {
        name: "Business Goals 2",
        fields: [
          {
            id: 163,
            name: "growth_opportunities",
            page: "Business Goals 2",
            type: FieldType.LongText,
            label: "What do you see as your biggest opportunities for growth?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 164,
            name: "challenges",
            page: "Business Goals 2",
            type: FieldType.LongText,
            label:
              "What is the biggest challenge you face in running your business?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 165,
            name: "near_term_goals",
            page: "Business Goals 2",
            type: FieldType.LongText,
            label: "What would you like to accomplish in the near term?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Business Goals",
      },
    ],
    review: false,
  },
};

export const RECOMMENDATION_BUSINESS_OFFERING_FORM_DEFINITION: FormidableForm =
  {
    id: 10,
    created_at: "2024-09-30T16:44:16.862880-06:00",
    updated_at: "2024-09-30T16:55:02.223865-06:00",
    name: "Business Offering",
    slug: "business-offering",
    review: false,
    definition: {
      id: 10,
      name: "Business Offering",
      pages: [
        {
          name: "Product Market Fit",
          fields: [
            {
              id: 173,
              name: "disappointed_percentage",
              page: "Product Market Fit",
              type: FieldType.PositiveInteger,
              label:
                "What percentage of your customers would be very disappointed if your business closed?",
              order: 0,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: false,
            },
            {
              id: 174,
              name: "customer_retention_percent",
              page: "Product Market Fit",
              type: FieldType.PositiveInteger,
              label:
                "On an annual basis, what percentage of your customers continue to do business with you?",
              order: 1,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: false,
            },
            {
              id: 175,
              name: "differentiation",
              page: "Product Market Fit",
              type: FieldType.LongText,
              label:
                "How does your product or service differentiate from competitors or alternative solutions?",
              order: 2,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: false,
            },
            {
              id: 176,
              enum: [
                {
                  label: "Strongly Disagree",
                  value: "strongly_disagree",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Disagree",
                  value: "disagree",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Neutral",
                  value: "neutral",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Agree",
                  value: "agree",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Strongly Agree",
                  value: "strongly_agree",
                  textbox: false,
                  placeholder: "",
                },
              ],
              name: "pmf likert",
              page: "Product Market Fit",
              type: FieldType.Likert,
              label: "",
              order: 3,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: false,
              internal_fields: [
                {
                  id: 177,
                  name: "customer_understanding",
                  page: "Product Market Fit",
                  type: FieldType.Radio,
                  label:
                    "How well do you understand your ideal customer’s profile, including their values, needs, and pain points? ",
                  order: 0,
                  hidden: false,
                  parent: "pmf likert",
                  add_more: false,
                  disabled: false,
                  readonly: false,
                  required: true,
                },
                {
                  id: 178,
                  name: "customer_value_alignment",
                  page: "Product Market Fit",
                  type: FieldType.Text,
                  label:
                    "How well does your solution align with the key values and needs of your customers?",
                  order: 1,
                  hidden: false,
                  parent: "pmf likert",
                  add_more: false,
                  disabled: false,
                  readonly: false,
                  required: false,
                },
                {
                  id: 179,
                  name: "customer_pain_alignment",
                  page: "Product Market Fit",
                  type: FieldType.Text,
                  label:
                    "How well does your solution address the pain points of your customers and help them achieve their goals?",
                  order: 2,
                  hidden: false,
                  parent: "pmf likert",
                  add_more: false,
                  disabled: false,
                  readonly: false,
                  required: false,
                },
              ],
            },
          ],
          header: "Product Market Fit",
        },
        {
          name: "Pricing & Bundling",
          fields: [
            {
              id: 180,
              enum: [
                {
                  label: "Competitor pricing",
                  value: "competitors",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Cost plus profit",
                  value: "cost_plus_profit",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Value-based",
                  value: "value_based",
                  textbox: false,
                  placeholder: "",
                },
                {
                  label: "Customer data analysis",
                  value: "customer_data_analysis",
                  textbox: false,
                  placeholder: "",
                },
              ],
              name: "pricing_method",
              page: "Pricing & Bundling",
              type: FieldType.Checkbox,
              label:
                "How did you determine the pricing for your products or services?",
              order: 0,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: false,
            },
            {
              id: 181,
              name: "has_tiered_pricing",
              page: "Pricing & Bundling",
              type: FieldType.YesNo,
              label: "Do you offer tiered pricing?",
              order: 1,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: true,
            },
            {
              id: 182,
              name: "has_membership_model",
              page: "Pricing & Bundling",
              type: FieldType.YesNo,
              label: "Do you use a membership model?",
              order: 2,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: true,
            },
            {
              id: 183,
              name: "has_bundling_options",
              page: "Pricing & Bundling",
              type: FieldType.YesNo,
              label: "Do you offer bundling options?",
              order: 3,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: true,
            },
            {
              id: 184,
              name: "has_payment_plans",
              page: "Pricing & Bundling",
              type: FieldType.YesNo,
              label: "Do you provide payment plans?",
              order: 4,
              hidden: false,
              add_more: false,
              disabled: false,
              readonly: false,
              required: true,
            },
          ],
          header: "Pricing & Bundling",
        },
      ],
      review: false,
    },
  };

export const RECOMMENDATION_MARKETING_FORM_DEFINITION = {
  id: 11,
  created_at: "2024-09-30T16:58:41.720469-06:00",
  updated_at: "2024-09-30T17:10:37.444906-06:00",
  name: "Growth Marketing",
  slug: "growth-marketing",
  review: false,
  definition: {
    id: 11,
    name: "Growth Marketing",
    pages: [
      {
        name: "Marketing Opportunities",
        fields: [
          {
            id: 185,
            name: "marketing_opportunities",
            page: "Marketing Opportunities",
            type: FieldType.LongText,
            label:
              "Where do you see the biggest opportunities for growth and improvement in your marketing efforts?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Marketing Opportunities",
      },
      {
        name: "Digital Strategy",
        fields: [
          {
            id: 186,
            enum: [
              {
                label: "Website",
                value: "website",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Social media profiles",
                value: "social_media",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Online reviews",
                value: "reviews",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Blog posts",
                value: "blog",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Digital ads",
                value: "ads",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Email marketing",
                value: "email",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Business directories",
                value: "directories",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Forums",
                value: "forums",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Other",
                value: "other",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "digital_channels",
            page: "Digital Strategy",
            type: FieldType.Checkbox,
            label:
              "Which digital channels does your business have? (Select all that apply)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 187,
            name: "other_digital_channels",
            page: "Digital Strategy",
            type: FieldType.LongText,
            label: "Other, please specify: (Optional)",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 188,
            name: "digital_monthly_leads",
            page: "Digital Strategy",
            type: FieldType.PositiveInteger,
            label:
              "How many new leads do these digital channels generate for your business each month? (An estimate is fine)",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 189,
            name: "yoy_digital_lead_growth",
            page: "Digital Strategy",
            type: FieldType.PositiveInteger,
            label:
              "What is the year-over-year growth rate of leads from digital channels (An estimate is fine)",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Digital Strategy",
      },
      {
        name: "Traditional Marketing",
        fields: [
          {
            id: 190,
            enum: [
              {
                label: "Community events",
                value: "events",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Trade shows",
                value: "trade_shows",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Sponsorships",
                value: "sponsors",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Promotions",
                value: "promotions",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Traditional ads",
                value: "ads",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Direct mail",
                value: "direct_mail",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Cold calling",
                value: "calls",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Word of mouth",
                value: "word_of_mouth",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Other",
                value: "other",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "traditional_channels",
            page: "Traditional Marketing",
            type: FieldType.Checkbox,
            label:
              "What traditional marketing strategies do you use? (Select all that apply)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 191,
            name: "other_traditional_channels",
            page: "Traditional Marketing",
            type: FieldType.LongText,
            label: "Other, please specify: (Optional)",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 192,
            name: "traditional_monthly_leads",
            page: "Traditional Marketing",
            type: FieldType.PositiveInteger,
            label:
              "How many new leads do these traditional sources generate for your business each month? (An estimate is fine)",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 193,
            min: 0,
            name: "yoy_traditional_lead_growth",
            page: "Traditional Marketing",
            type: FieldType.PositiveInteger,
            label:
              "What is the year-over-year growth rate of leads from these traditional sources? (An estimate is fine)",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Traditional Marketing",
      },
      {
        name: "Partnerships",
        fields: [
          {
            id: 194,
            name: "partnerships_count",
            page: "Partnerships",
            type: FieldType.PositiveInteger,
            label:
              "How many partnerships or affiliates generate leads and sales for your business?(An estimate is fine)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
            placeholder: "# partnerships",
          },
          {
            id: 195,
            name: "other_partners_count",
            page: "Partnerships",
            type: FieldType.Text,
            label:
              "How many organizations, non-profits, or companies do you regularly work with? (An estimate is fine)",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
            placeholder: "#",
          },
        ],
        header: "Partnerships",
      },
    ],
    review: false,
  },
  schema: {
    type: "object",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    required: [
      "Marketing Opportunities",
      "Digital Strategy",
      "Traditional Marketing",
      "Partnerships",
    ],
    properties: {
      Partnerships: {
        type: "object",
        required: ["partnerships_count", "other_partners_count"],
        properties: {
          partnerships_count: {
            type: "integer",
            minimum: 0,
          },
          other_partners_count: {
            type: "string",
          },
        },
      },
      "Digital Strategy": {
        type: "object",
        required: ["digital_monthly_leads", "yoy_digital_lead_growth"],
        properties: {
          digital_channels: {
            type: "object",
            required: [
              "website",
              "social_media",
              "reviews",
              "blog",
              "ads",
              "email",
              "directories",
              "forums",
              "other",
            ],
            properties: {
              ads: {
                type: "boolean",
              },
              blog: {
                type: "boolean",
              },
              email: {
                type: "boolean",
              },
              other: {
                type: "boolean",
              },
              forums: {
                type: "boolean",
              },
              reviews: {
                type: "boolean",
              },
              website: {
                type: "boolean",
              },
              directories: {
                type: "boolean",
              },
              social_media: {
                type: "boolean",
              },
            },
            additionalProperties: false,
          },
          digital_monthly_leads: {
            type: "integer",
            minimum: 0,
          },
          other_digital_channels: {
            type: "string",
          },
          yoy_digital_lead_growth: {
            type: "integer",
            minimum: 0,
          },
        },
      },
      "Traditional Marketing": {
        type: "object",
        required: ["traditional_monthly_leads"],
        properties: {
          traditional_channels: {
            type: "object",
            required: [
              "events",
              "trade_shows",
              "sponsors",
              "promotions",
              "ads",
              "direct_mail",
              "calls",
              "word_of_mouth",
              "other",
            ],
            properties: {
              ads: {
                type: "boolean",
              },
              calls: {
                type: "boolean",
              },
              other: {
                type: "boolean",
              },
              events: {
                type: "boolean",
              },
              sponsors: {
                type: "boolean",
              },
              promotions: {
                type: "boolean",
              },
              direct_mail: {
                type: "boolean",
              },
              trade_shows: {
                type: "boolean",
              },
              word_of_mouth: {
                type: "boolean",
              },
            },
            additionalProperties: false,
          },
          traditional_monthly_leads: {
            type: "integer",
            minimum: 0,
          },
          other_traditional_channels: {
            type: "string",
          },
          yoy_traditional_lead_growth: {
            type: "integer",
            minimum: 0,
          },
        },
      },
      "Marketing Opportunities": {
        type: "object",
        required: [],
        properties: {
          marketing_opportunities: {
            type: "string",
          },
        },
      },
    },
  },
};

export const RECOMMENDATION_CONVERSION_FORM_DEFINITION = {
  id: 12,
  created_at: "2024-09-30T17:11:05.450683-06:00",
  updated_at: "2024-09-30T17:20:57.605878-06:00",
  name: "Lead Conversion",
  slug: "lead-conversion",
  review: false,
  definition: {
    id: 12,
    name: "Lead Conversion",
    pages: [
      {
        name: "Pipeline Management",
        fields: [
          {
            id: 196,
            max: 100,
            min: 0,
            name: "overall_conversion_percent",
            page: "Pipeline Management",
            type: FieldType.PositiveInteger,
            label:
              "What percentage of inquiries or interests convert into actual customers? An estimate is fine.",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 197,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Neutral",
                value: "neutral",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "pipeline_likert",
            page: "Pipeline Management",
            type: FieldType.Likert,
            label: "",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 198,
                name: "lead_prioritization",
                page: "Pipeline Management",
                type: FieldType.Radio,
                label:
                  "Do you prioritize your time with high-quality leads or high-fit potential customers?",
                order: 0,
                hidden: false,
                parent: "pipeline_likert",
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
          {
            id: 199,
            enum: [
              {
                label: "Website",
                value: "website",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Social Media Profiles",
                value: "social_media",
                textbox: false,
                placeholder: "",
              },
              {
                label: "In-store / on-premise",
                value: "in_store",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Customer Service",
                value: "customer_service",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "effective_conversion_touchpoints",
            page: "Pipeline Management",
            type: FieldType.Checkbox,
            label:
              "Which customer touchpoints are most effective in driving lead conversions?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 200,
            name: "word_of_mouth_percent",
            page: "Pipeline Management",
            type: FieldType.PositiveInteger,
            label: "What percentage of business is word of mouth?",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Pipeline Management",
      },
      {
        name: "Customer Experience",
        fields: [
          {
            id: 201,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Neutral",
                value: "neutral",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "CX Likert",
            page: "Customer Experience",
            type: FieldType.Likert,
            label: "",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 202,
                name: "personalized_interactions",
                page: "Customer Experience",
                type: FieldType.Radio,
                label:
                  "How personalized are your interactions and communications with prospective customers based on their preferences and past interactions?",
                order: 0,
                hidden: false,
                parent: "CX Likert",
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 203,
                name: "addresses_concerns",
                page: "Customer Experience",
                type: FieldType.Radio,
                label:
                  "How effectively do you address friction points during a prospect’s first contact with your business?",
                order: 1,
                hidden: false,
                parent: "CX Likert",
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 204,
                name: "value_communication",
                page: "Customer Experience",
                type: FieldType.Radio,
                label:
                  "How clearly and consistently do you communicate the unique value and benefits of your solution across all touchpoint, including follow-ups?",
                order: 2,
                hidden: false,
                parent: "CX Likert",
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 205,
                name: "customer_feels_heard",
                page: "Customer Experience",
                type: FieldType.Text,
                label:
                  "How well do prospects feel heard and understood during their first contact with your business?",
                order: 3,
                hidden: false,
                parent: "CX Likert",
                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
            ],
          },
        ],
        header: "Customer Experience",
      },
    ],
    review: false,
  },
  schema: {
    type: "object",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    required: ["Pipeline Management", "Customer Experience"],
    properties: {
      "Customer Experience": {
        type: "object",
        required: [],
        properties: {
          "CX Likert": {
            type: "object",
            required: [
              "personalized_interactions",
              "addresses_concerns",
              "value_communication",
            ],
            properties: {
              addresses_concerns: {
                enum: [
                  "strongly_disagree",
                  "disagree",
                  "neutral",
                  "agree",
                  "strongly_agree",
                ],
                type: "string",
              },
              value_communication: {
                enum: [
                  "strongly_disagree",
                  "disagree",
                  "neutral",
                  "agree",
                  "strongly_agree",
                ],
                type: "string",
              },
              customer_feels_heard: {
                type: "string",
              },
              personalized_interactions: {
                enum: [
                  "strongly_disagree",
                  "disagree",
                  "neutral",
                  "agree",
                  "strongly_agree",
                ],
                type: "string",
              },
            },
          },
        },
      },
      "Pipeline Management": {
        type: "object",
        required: [
          "overall_conversion_percent",
          "effective_conversion_touchpoints",
          "word_of_mouth_percent",
        ],
        properties: {
          pipeline_likert: {
            type: "object",
            required: ["lead_prioritization"],
            properties: {
              lead_prioritization: {
                enum: [
                  "strongly_disagree",
                  "disagree",
                  "neutral",
                  "agree",
                  "strongly_agree",
                ],
                type: "string",
              },
            },
          },
          word_of_mouth_percent: {
            type: "integer",
            minimum: 0,
          },
          overall_conversion_percent: {
            type: "integer",
            maximum: 100,
            minimum: 0,
          },
          effective_conversion_touchpoints: {
            type: "object",
            required: [
              "website",
              "social_media",
              "in_store",
              "customer_service",
            ],
            properties: {
              website: {
                type: "boolean",
              },
              in_store: {
                type: "boolean",
              },
              social_media: {
                type: "boolean",
              },
              customer_service: {
                type: "boolean",
              },
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
};

export const RECOMMENDATION_SYSTEMS_FORM_DEFINITION = {
  id: 13,
  created_at: "2024-09-30T17:21:34.222501-06:00",
  updated_at: "2024-09-30T17:33:34.693279-06:00",
  name: "Operations & Systems",
  slug: "operations-systems",
  review: false,
  definition: {
    id: 13,
    name: "Operations & Systems",
    pages: [
      {
        name: "Cash & Spend Management",
        fields: [
          {
            id: 211,
            name: "payment_turnaround_time",
            page: "Cash & Spend Management",
            type: FieldType.Text,
            label:
              "How long does it typically take for your business to get paid? An estimate is fine.",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
            placeholder: "How long does it take to get paid",
          },
          {
            id: 212,
            name: "has_seasonality",
            page: "Cash & Spend Management",
            type: FieldType.YesNo,
            label: "Is there any seasonality in your cash flow?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Cash & Spend Management",
      },
      {
        name: "Business Systems",
        fields: [
          {
            id: 213,
            name: "tech_systems",
            page: "Business Systems",
            type: FieldType.LongText,
            label:
              "What technology systems (e.g., CRM, ERP, Accounting software) do you use for operations?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 214,
            name: "has_effective_systems",
            page: "Business Systems",
            type: FieldType.YesNo,
            label:
              "Are your current systems and software effective in improving productivity?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 215,
            name: "data_analysis_systems",
            page: "Business Systems",
            type: FieldType.LongText,
            label:
              "What kind of data analysis do you perform, and what systems support this analysis?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Business Systems",
      },
      {
        name: "Business Systems 2",
        fields: [
          {
            id: 216,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Neutral",
                value: "neutral",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "Processes likert",
            page: "Business Systems 2",
            type: FieldType.Likert,
            label: "",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 217,
                name: "understand_roles",
                page: "Business Systems 2",
                type: FieldType.Radio,
                label:
                  "Does everyone in your business understand their roles and responsibilities?",
                order: 0,
                hidden: false,
                parent: "Processes likert",
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
          {
            id: 218,
            name: "has_standardized_procedures",
            page: "Business Systems 2",
            type: FieldType.YesNo,
            label: "Are your work processes and procedures standardized?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 219,
            name: "follows_procedures",
            page: "Business Systems 2",
            type: FieldType.LongText,
            label:
              "How well does your staff follow these standards, and how often do you review and improve them?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 220,
            name: "has_org_chart",
            page: "Business Systems 2",
            type: FieldType.YesNo,
            label: "Do you have an organizational chart?",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 221,
            name: "has_employee_handbook",
            page: "Business Systems 2",
            type: FieldType.YesNo,
            label: "Do you have an employee handbook?",
            order: 4,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 222,
            name: "has_employee_trainings",
            page: "Business Systems 2",
            type: FieldType.YesNo,
            label: "Do you offer training to your employees?",
            order: 5,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Business Processes",
      },
    ],
    review: false,
  },
  schema: {
    type: "object",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    required: [
      "Cash & Spend Management",
      "Business Systems",
      "Business Systems 2",
    ],
    properties: {
      "Business Systems": {
        type: "object",
        required: ["tech_systems", "has_effective_systems"],
        properties: {
          tech_systems: {
            type: "string",
          },
          data_analysis_systems: {
            type: "string",
          },
          has_effective_systems: {
            enum: ["yes", "no"],
            type: "string",
          },
        },
      },
      "Business Systems 2": {
        type: "object",
        required: [
          "has_standardized_procedures",
          "has_org_chart",
          "has_employee_handbook",
        ],
        properties: {
          has_org_chart: {
            enum: ["yes", "no"],
            type: "string",
          },
          "Processes likert": {
            type: "object",
            required: ["understand_roles"],
            properties: {
              understand_roles: {
                enum: [
                  "strongly_disagree",
                  "disagree",
                  "neutral",
                  "agree",
                  "strongly_agree",
                ],
                type: "string",
              },
            },
          },
          follows_procedures: {
            type: "string",
          },
          has_employee_handbook: {
            enum: ["yes", "no"],
            type: "string",
          },
          has_employee_trainings: {
            enum: ["yes", "no"],
            type: "string",
          },
          has_standardized_procedures: {
            enum: ["yes", "no"],
            type: "string",
          },
        },
      },
      "Cash & Spend Management": {
        type: "object",
        required: ["payment_turnaround_time"],
        properties: {
          has_seasonality: {
            enum: ["yes", "no"],
            type: "string",
          },
          payment_turnaround_time: {
            type: "string",
          },
        },
      },
    },
  },
};

export const RECOMMENDATIONS_FORM_ID = RECOMMENDATION_FORM_DEFINITION.id;
export const VALUATION_FORM_ID = VALUATION_FORM_DEFINITION.id;
export const ONBOARDING_FORM_IDS = [VALUATION_FORM_ID, RECOMMENDATIONS_FORM_ID];
