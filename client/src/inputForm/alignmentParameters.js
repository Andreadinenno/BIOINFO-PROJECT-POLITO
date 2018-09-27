//these are the alignment params fields of the form
export default [
  {
    label: "Species codes",
    help:
      "Specie or species that have to be selected as reference(s) during tags alignment procedure.",
    id: "s",
    noValueError: "This cannot be empty",
    type: "text",
    max: "5"
  },
  {
    label: "Min tag length",
    help: "Minimum alignment length to perform the third ungapped extension.",
    id: "l",
    noValueError: "This cannot be empty",
    type: "number",
    max: "10"
  },
  {
    label: "Seed size",
    help: "miRNA seed size to be searched into tags sequences.",
    id: "ss",
    noValueError: "This cannot be empty",
    type: "number",
    max: "6"
  },
  {
    label: "Begin seed",
    help: "miRNA seed start position.",
    id: "sb",
    noValueError: "This cannot be empty",
    type: "number",
    max: "2"
  },
  {
    label: "End seed",
    help: "miRNA seed end position.",
    id: "se",
    noValueError: "This cannot be empty",
    type: "number",
    max: "7"
  },
  {
    label: "Tag begin",
    help:
      "Maximum coordinate in the tag at which miRNA seed has to be searched.",
    id: "b",
    noValueError: "This cannot be empty",
    type: "number",
    max: "4"
  },
  {
    label: "Tag selection Threshold",
    help: "Threshold used to discard multi-mapped tags with higher scores.",
    id: "h",
    noValueError: "This cannot be empty",
    type: "number",
    max: "11"
  }
];
