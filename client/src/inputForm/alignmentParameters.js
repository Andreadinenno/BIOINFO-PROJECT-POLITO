//these are the alignment params fields of the form

/*  -dap, --dpAllignOnPremirs BOOL
          Allign unmapped tag on premir One of 1, ON, TRUE, T, YES, 0, OFF,
          FALSE, F, and NO.
    -ald, --affineLinearDgs INTEGER
          Chose the gap scheme affine(0) linear(1) or dynamic(2) to be used in
          the alignment (default: affine(0)).
    -go, --gapOpen DOUBLE
          Gap open cost for the Smith-Waterman alignment
    -ge, --gapExtend DOUBLE
          Gap extend cost for the Smith-Waterman alignment
    -ma, --match DOUBLE
          Score of a match for the Smith-Waterman alignment
    -mm, --mismatch DOUBLE
          Score of a mismatch for the Smith-Waterman alignment
    -gl, --globalLocal BOOL
          Use the global local or global-Unconstrained algorithm (default:
          global(0) - local(1)) One of 1, ON, TRUE, T, YES, 0, OFF, FALSE, F,
          and NO.
    -ut, --unTop BOOL
          type used for the global-unconstrained alignment AlignConfig TTop
          (default: top(false) One of 1, ON, TRUE, T, YES, 0, OFF, FALSE, F,
          and NO.
    -ul, --unLeft BOOL
          type used for the global-unconstrained alignment AlignConfig TLeft
          (default: left(false) One of 1, ON, TRUE, T, YES, 0, OFF, FALSE, F,
          and NO.
    -ur, --unRight BOOL
          type used for the global-unconstrained alignment AlignConfig TRight
          (default: right(false) One of 1, ON, TRUE, T, YES, 0, OFF, FALSE, F,
          and NO.
    -ud, --unDown BOOL
          type used for the global-unconstrained alignment AlignConfig TDown
          (default: down(false) One of 1, ON, TRUE, T, YES, 0, OFF, FALSE, F,
          and NO.
    -sc, --specieCodes STRING
          Specie codes to be evaluated during the alignment at the same time
    -msas, --minSizeAlnStp1 INTEGER
          Minimum size of ungapped alignment, starting from the seed,
          extending the alignment
    -mas, --minAlignScore INTEGER
          Minimum alignment score for considering a tag expression of a miR
    -ss, --seedStart INTEGER
          Start position of the seed
    -se, --seedEnd INTEGER
          End position of the seed
    -mspt, --maxStartPosTag INTEGER
          Max index in tag position for starting the seed alignment
    -mst, --minSizeTag INTEGER
          Minimum size of tag to be considered for the alignment
    -tst, --thrSelectTags INTEGER
          Threshold used to select select high quality multimapped tags
    -mos, --mismatchsOutSeed INTEGER
          Number of mismatches allowed between miRNA and tags tags
    -mis, --mismatchsInSeed INTEGER
          Number of mismatches allowed between miRNA seed and tags tags*/
export default [
  {
    label: "Allign on premir",
    help: "",
    id: "dap",
    trueValue: "yes",
    falseValue: "no",
    type: "switch",
    default: 0
  },

  {
    label: "Gap scheme",
    help: "",
    id: "ald",
    type: "radio",
    options: ["1", "2", "3"],
    default: ""
  },

  {
    label: "Gap open cost",
    help: "Gap open cost for the Smith-Waterman alignment",
    id: "go",
    type: "double",
    default: ""
  },

  {
    label: "Gap extend cost",
    help: "Gap extend cost for the Smith-Waterman alignment",
    id: "ge",
    type: "double",
    default: ""
  },

  {
    label: "Match score",
    help: "Score of a match for the Smith-Waterman alignment",
    id: "ma",
    type: "double",
    default: ""
  },

  {
    label: "Mismatch score",
    help: "Score of a mismatch for the Smith-Waterman alignment",
    id: "mm",
    type: "double",
    default: ""
  },

  {
    label: "Local/Unconstrained",
    help: "Use the global local or global-Unconstrained algorithm",
    id: "gl",
    type: "switch",
    falseValue: "Global",
    trueValue: "Local",
    default: 0
  },

  {
    label: "Local/Unconstrained ",
    help: "Type used for the global-unconstrained alignment",
    id: "ut",
    type: "switch",
    falseValue: "TTop",
    trueValue: "AlignConfig",
    default: 0
  }
];
