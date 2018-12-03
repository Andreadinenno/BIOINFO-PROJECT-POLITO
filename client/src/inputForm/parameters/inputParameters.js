export default [
  {
    label: "Input file storing star miRs",
    id: "ifs",
    type: "file"
  },
  {
    label: "Input file storing GFF3 with miR/premiR annotated on genome",
    id: "ifg",
    type: "file"
  },
  {
    label: "Type field of miRNA in GFF3 input file",
    id: "tmg",
    type: "text"
  },
  {
    label:
      "Name of input file storing BED with miR/premiR annotated on ref genome",
    id: "ifb",
    type: "file"
  },
  {
    label: "Input file storing Pre-miRs",
    id: "ifpe",
    type: "file"
  },
  {
    label: "Input file storing Pri-miRs",
    id: "ifpi",
    type: "file"
  },
  {
    label: "Dna To Rna conversion",
    id: "dor",
    type: "switch"
  },
  {
    label: "Unformatted name of mature miRNAs",
    id: "umn",
    type: "switch"
  }
];
