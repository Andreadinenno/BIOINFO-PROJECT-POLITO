export default [
  {
    label: "Input file storing Tags",
    id: "ift",
    optional: false,
    type: "file"
  },
  {
    label: "Input file storing mature/star miRs",
    id: "ifm",
    optional: false,
    type: "file"
  },
  {
    label: "Input file storing star miRs",
    id: "ifs",
    optional: true,
    type: "file"
  },
  {
    label: "Input file storing GFF3 with miR/premiR annotated on genome",
    id: "ifg",
    optional: true,
    type: "file"
  },
  {
    label: "Type field of miRNA in GFF3 input file",
    id: "tmg",
    optional: true,
    type: "text"
  },
  {
    label:
      "Name of input file storing BED with miR/premiR annotated on ref genome",
    id: "ifb",
    optional: false,
    type: "file"
  },
  {
    label: "Input file storing Pre-miRs",
    id: "ifpe",
    optional: true,
    type: "file"
  },
  {
    label: "Input file storing Pri-miRs",
    id: "ifpi",
    optional: true,
    type: "file"
  },
  {
    label: "Dna To Rna conversion",
    id: "dor",
    trueValue: 1,
    falseValue: 0,
    optional: false,
    type: "switch"
  },
  {
    label: "Unformatted name of mature miRNAs",
    id: "umn",
    trueValue: 1,
    falseValue: 0,
    optional: false,
    type: "switch"
  }
];
