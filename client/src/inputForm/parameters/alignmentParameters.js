//these are the alignment params fields of the form
export default [
  {
    label: "Allign on premir",
    help: "",
    id: "dap",
    trueValue: "yes",
    falseValue: "no",
    type: "switch",
    default: 0,
    optional: false
  },

  {
    label: "Gap scheme",
    help: "",
    id: "ald",
    type: "radio",
    options: ["1", "2", "3"],
    default: "",
    optional: false
  },

  {
    label: "Gap open cost",
    help: "Gap open cost for the Smith-Waterman alignment",
    id: "go",
    type: "number",
    default: "",
    optional: false
  },

  {
    label: "Gap extend cost",
    help: "Gap extend cost for the Smith-Waterman alignment",
    id: "ge",
    type: "number",
    default: "",
    optional: false
  },

  {
    label: "Match score",
    help: "Score of a match for the Smith-Waterman alignment",
    id: "ma",
    type: "number",
    default: "",
    optional: false
  },

  {
    label: "Mismatch score",
    help: "Score of a mismatch for the Smith-Waterman alignment",
    id: "mm",
    type: "number",
    default: "",
    optional: false
  },

  {
    label: "Local/Unconstrained",
    help: "Use the global local or global-Unconstrained algorithm",
    id: "gl",
    type: "switch",
    falseValue: "Global",
    trueValue: "Local",
    default: 0,
    optional: false
  },

  {
    label: "Local/Unconstrained ",
    help: "Type used for the global-unconstrained alignment",
    id: "ut",
    type: "switch",
    falseValue: "TTop",
    trueValue: "AlignConfig",
    default: 0,
    optional: false
  }
];
