// Course data — WGU B.S. Computer Science, Program ID 261.
// The degree plan itself is identical regardless of transfer provider.
// Each course lists its own Sophia and/or Study.com equivalent course(s),
// straight from the two transfer pathway agreement lists. A course with
// neither listed has no current transfer-credit option through either
// provider. Program Specific courses never carry a transfer tag.
const COURSES = [
  { id: "D270", name: "Composition: Successful Self-Expression", units: 3, sophia: "ENG1001 (SOPH-0015), ENG1002 (SOPH-0030), ENG1010 (SOPH-0050), ENG1020 (SOPH-0049)", study: "English 104 (SDCM-0057), English 204 (SDCM-0244), or English 105 (SDCM-0089)", certs: null, category: "General Education" },
  { id: "D268", name: "Introduction to Communication: Connecting with Others", units: 3, sophia: "COMM1002 (SOPH-0024), COMM1010 (SOPH-0034), or BUSI1025 (SOPH-0059)", study: "Communications 101 (SDCM-0055), Business 113 (SDCM-0052), or Business 324 (SDCM-0140)", certs: null, category: "General Education" },
  { id: "C963", name: "American Politics and the US Constitution", units: 3, sophia: "HIST1020 (SOPH-0071)", study: "Political Science 102 (SDCM-0042)", certs: null, category: "General Education" },
  { id: "D333", name: "Ethics in Technology", units: 3, sophia: null, study: "Philosophy 104 (SDCM-0265)", certs: null, category: "General Education" },
  { id: "D459", name: "Introduction to Systems Thinking and Applications", units: 3, sophia: null, study: null, certs: null, category: "General Education" },
  { id: "C959", name: "Discrete Mathematics I (WGU Locked)", units: 4, sophia: null, study: null, certs: null, category: "General Education" },
  { id: "C960", name: "Discrete Mathematics II", units: 4, sophia: null, study: null, certs: null, category: "General Education" },
  { id: "C958", name: "Calculus I", units: 4, sophia: "MATH1040 (SOPH-0060)", study: "Math 104 (SDCM-0016)", certs: null, category: "General Education" },
  { id: "C955", name: "Applied Probability and Statistics", units: 3, sophia: "STAT1001 (SOPH-0005)", study: "Statistics 101 (SDCM-0068) or Business 212 (SDCM-0025)", certs: null, category: "General Education" },
  { id: "C458", name: "Health, Fitness, and Wellness", units: 4, sophia: "HLTH1010 (SOPH-0063) or HLTH1011 (SOPH-0080)", study: "Health 101 (SDCM-0032) or Nutrition 101 (SDCM-0034)", certs: null, category: "General Education" },
  { id: "C683", name: "Natural Science Lab", units: 2, sophia: "SCIE1021 (SOPH-0067), SCIE1031 (SOPH-0070), SCIE1046 (SOPH-0075), SCIE1051 (SOPH-0072), or SCIE1056 (SOPH-0082)", study: "Biology 101L (SDCM-0188), Chemistry 111L (SDCM-0194), Chemistry 112L (SDCM-0195), Biology 107L (SDCM-0242), Biology 201L (SDCM-0246), Biology 202L (SDCM-0247), Physics 111L (SDCM-0255), Science 101L (SDCM-0258), or Physics 112L (SDCM-0259)", certs: null, category: "General Education" },

  { id: "D426", name: "Data Management – Foundations", units: 3, sophia: "CS1011 (SOPH-0047)", study: "Analytics 103 (SDCM-0240) or Computer Science 107 (SDCM-0212)", certs: "CIW Database Design Specialist (1D0-541); Microsoft Azure Database Administrator Associate (DP-300); Oracle Database Foundations (1Z0-006)", category: "Core" },
  { id: "D315", name: "Network and Security – Foundations", units: 3, sophia: "CS1015 (SOPH-0068)", study: "Computer Science 108 (SDCM-0213) or Computer Science 304 (SDCM-0219)", certs: "CompTIA Network+, Security+, Pentest+, CySA+, SecurityX (CASP+); EC-Council CEH; Cisco CCNA/CCNP/CCIE (except collaboration); GIAC GSE, GSEC, GCIA, GCED", category: "Core" },
  { id: "D684", name: "Introduction to Computer Science", units: 4, sophia: null, study: null, certs: null, category: "Core" },
  { id: "E009", name: "Web Design Fundamentals", units: 3, sophia: "CS1005 (SOPH-0043)", study: "Computer Science 104 (SDCM-0249)", certs: null, category: "Core" },

  { id: "E082", name: "Linear Algebra for Engineers", units: 3, sophia: null, study: "Math 301 (SDCM-0253)", certs: null, category: "Additional" },
  { id: "D427", name: "Data Management – Applications", units: 4, sophia: null, study: "Computer Science 204 (SDCM-0218)", certs: "CIW Database Design Specialist (1D0-541); Microsoft Azure Database Administrator Associate (DP-300); Oracle Database Foundations (1Z0-006)", category: "Additional" },
  { id: "D286", name: "Java Fundamentals", units: 3, sophia: "CS1101 (SOPH-0062)", study: "Computer Science 115 (SDCM-0199)", certs: "Oracle Certified Associate: Java SE 8 Programmer (1Z0-808)", category: "Additional" },
  { id: "D287", name: "Java Frameworks", units: 3, sophia: null, study: null, certs: "Oracle Certified Professional: Java SE 8 Programmer", category: "Additional" },
  { id: "C867", name: "Scripting and Programming – Applications", units: 4, sophia: "CS1100 (SOPH-0058)", study: "Computer Science 109 (SDCM-0214), Computer Science 112 (SDCM-0198), or Computer Science 113 (SDCM-0216)", certs: "Oracle Certified Associate: Java SE 8 Programmer (1Z0-808)", category: "Additional" },
  { id: "C949", name: "Data Structures and Algorithms I (WGU Locked)", units: 4, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "D827", name: "Fundamentals of Information Security", units: 3, sophia: null, study: "Computer Science 202 (SDCM-0200) or Computer Science 110 (SDCM-0215)", certs: "EC-Council CEH, CCISO, ECSS; CompTIA SecurityX (CASP+), Security+; ISC2 CC, CISSP; ISACA CISA, CISM, CRISC; GIAC GISF, GCED, GSEC", category: "Additional" },
  { id: "E010", name: "Foundations of Programming (Python)", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "D281", name: "Linux Foundations", units: 3, sophia: null, study: null, certs: "LPI Linux Essentials; CompTIA Linux+, LPIC-1, LPIC-2, LPIC-3; Linux Foundation LFCS; Red Hat RHCSA, RHCE, RHCA; Oracle Linux 8 Advanced System Administration (1Z0-106)", category: "Additional" },
  { id: "D686", name: "Operating Systems for Computer Scientists", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "C952", name: "Computer Architecture (WGU Locked)", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "D429", name: "Introduction to AI for Computer Scientists", units: 2, sophia: null, study: "Computer Science 311 (SDCM-0230) or Gen 101 (SDCM-0261)", certs: null, category: "Additional" },
  { id: "D480", name: "Software Design and Quality Assurance", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "E074", name: "Agile for Software Engineering", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "D288", name: "Back-End Programming", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "E155", name: "Advanced Java", units: 3, sophia: null, study: null, certs: "Oracle Certified Professional: Java SE 8 Programmer", category: "Additional" },
  { id: "D685", name: "Practical Applications of Prompt Engineering", units: 2, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "D321", name: "AWS Developer", units: 3, sophia: null, study: null, certs: null, category: "Additional" },
  { id: "D197", name: "Version Control", units: 1, sophia: null, study: null, certs: null, category: "Additional" },

  { id: "E064", name: "Mathematics for Programmers", units: 3, sophia: null, study: null, certs: null, category: "Program Specific" },
  { id: "C950", name: "Data Structures and Algorithms II", units: 4, sophia: null, study: null, certs: null, category: "Program Specific" },
  { id: "D682", name: "Artificial Intelligence Optimization for Computer Scientists", units: 3, sophia: null, study: null, certs: null, category: "Program Specific" },
  { id: "D683", name: "Advanced AI and ML", units: 3, sophia: null, study: null, certs: null, category: "Program Specific" },
  { id: "D687", name: "Computer Science Project Development with a Team", units: 3, sophia: null, study: null, certs: null, category: "Program Specific" },
];
