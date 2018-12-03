//these are the alignment params fields of the form
export default [
  {
    label: "Allign on premir",
    help: "Allign unmapped tag on premir",
    id: "dap",
    type: "switch"
  },

  {
    label: "Gap scheme",
    help: "Chose the gap scheme affine(0) linear(1) or dynamic(2)",
    id: "ald",
    type: "radio",
    options: ["1", "2", "3"]
  },

  {
    label: "Gap open cost",
    help: "Gap open cost for the Smith-Waterman alignment",
    id: "go",
    type: "number",
    step: "0.01"
  },

  {
    label: "Gap extend cost",
    help: "Gap extend cost for the Smith-Waterman alignment",
    id: "ge",
    type: "number",
    step: "0.01"
  },

  {
    label: "Match score",
    help: "Score of a match for the Smith-Waterman alignment",
    id: "ma",
    type: "number",
    step: "0.01"
  },

  {
    label: "Mismatch score",
    help: "Score of a mismatch for the Smith-Waterman alignment",
    id: "mm",
    type: "number",
    step: "0.01"
  },

  {
    label: "Local/Unconstrained",
    help:
      "Use the global local or global-Unconstrained algorithm - default Local",
    id: "gl",
    type: "switch"
  },

  {
    label: "AlignConfig TTop",
    help:
      "type used for the global-unconstrained alignment AlignConfig TTop - default: top(false)",
    id: "ut",
    type: "switch"
  },
  {
    label: "AlignConfig TLeft",
    help:
      "type used for the global-unconstrained alignment AlignConfig TLeft - default: left(false)",
    id: "ul",
    type: "switch"
  },
  {
    label: "AlignConfig TRight",
    help:
      "type used for the global-unconstrained alignment AlignConfig TRight - default: right(false)",
    id: "ur",
    type: "switch"
  },
  {
    label: "AlignConfig TDown",
    help:
      "type used for the global-unconstrained alignment AlignConfig TDown - default: down(false)",
    id: "ud",
    type: "switch"
  },
  {
    label:
      "Specie codes to be evaluated during the alignment at the same time - default hsa(human)",
    id: "sc",
    type: "text"
  },
  {
    label:
      "Minimum size of ungapped alignment, starting from the seed, extending the alignment",
    id: "msas",
    type: "number",
    step: "1"
  },
  {
    label: "Minimum alignment score for considering a tag expression of a miRna",
    id: "mas",
    type: "number",
    step: "1"
  },
  {
    label: "Start position of the seed",
    id: "ss",
    type: "number",
    step: "1"
  },
  {
    label: "End position of the seed",
    id: "se",
    type: "number",
    step: "1"
  },
  {
    label: "Max index in tag position for starting the seed alignment",
    id: "mspt",
    type: "number",
    step: "1"
  },
  {
    label: "Minimum size of tag to be considered for the alignment",
    id: "mst",
    type: "number",
    step: "1"
  },
  {
    id: "tst",
    label: "Threshold used to select high quality multimapped tags",
    type: "number",
    step: "1"
  },
  {
    id: "mos",
    label: "Number of mismatches allowed between miRNA and tags",
    type: "number",
    step: "1"
  },
  {
    id: "mis",
    label: "Number of mismatches allowed between miRNA seed and tags",
    type: "number",
    step: "1"
  }
];
