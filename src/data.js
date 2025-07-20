// Georges River Libraries Multicultural Metrics Dashboard - Data Structure
// Communities: Chinese, Spanish, Greek, Nepali, Arabic
// Suburbs: Hurstville, Kogarah, Penshurst, South Hurstville, Oatley

export const programData = [
  // Chinese Community Programs
  {
    id: 1,
    name: "Mandarin ESL Conversation Circle",
    type: "ESL Class",
    community: "Chinese",
    suburb: "Hurstville",
    date: "2024-01-15",
    attendance: 32,
    newMembers: 6,
    facilitator: "Wei Chen"
  },
  {
    id: 2,
    name: "Digital Banking Workshop (Chinese)",
    type: "Digital Literacy",
    community: "Chinese",
    suburb: "Kogarah",
    date: "2024-01-22",
    attendance: 28,
    newMembers: 4,
    facilitator: "Li Ming"
  },
  {
    id: 3,
    name: "Lunar New Year Celebration",
    type: "Cultural Celebration",
    community: "Chinese",
    suburb: "Hurstville",
    date: "2024-02-10",
    attendance: 145,
    newMembers: 23,
    facilitator: "Jenny Wang"
  },
  {
    id: 4,
    name: "Chinese Calligraphy Workshop",
    type: "Cultural Event",
    community: "Chinese",
    suburb: "Penshurst",
    date: "2024-02-18",
    attendance: 41,
    newMembers: 8,
    facilitator: "Liu Zhang"
  },
  {
    id: 5,
    name: "Cantonese Story Time",
    type: "Language Support",
    community: "Chinese",
    suburb: "Kogarah",
    date: "2024-03-05",
    attendance: 35,
    newMembers: 7,
    facilitator: "Mary Lau"
  },

  // Spanish Community Programs
  {
    id: 6,
    name: "Spanish ESL Classes",
    type: "ESL Class",
    community: "Spanish",
    suburb: "Hurstville",
    date: "2024-01-18",
    attendance: 24,
    newMembers: 5,
    facilitator: "Maria Rodriguez"
  },
  {
    id: 7,
    name: "Digital Literacy for Seniors (Spanish)",
    type: "Digital Literacy",
    community: "Spanish",
    suburb: "Penshurst",
    date: "2024-02-08",
    attendance: 19,
    newMembers: 3,
    facilitator: "Carlos Silva"
  },
  {
    id: 8,
    name: "Latin American Cultural Night",
    type: "Cultural Celebration",
    community: "Spanish",
    suburb: "South Hurstville",
    date: "2024-02-25",
    attendance: 78,
    newMembers: 15,
    facilitator: "Isabel Martinez"
  },
  {
    id: 9,
    name: "Spanish Children's Story Hour",
    type: "Language Support",
    community: "Spanish",
    suburb: "Kogarah",
    date: "2024-03-12",
    attendance: 42,
    newMembers: 9,
    facilitator: "Ana Gutierrez"
  },

  // Greek Community Programs
  {
    id: 10,
    name: "Greek Language Preservation Class",
    type: "Language Support",
    community: "Greek",
    suburb: "Oatley",
    date: "2024-01-25",
    attendance: 31,
    newMembers: 6,
    facilitator: "Dimitri Kostas"
  },
  {
    id: 11,
    name: "Computer Skills for Greek Seniors",
    type: "Digital Literacy",
    community: "Greek",
    suburb: "Penshurst",
    date: "2024-02-14",
    attendance: 26,
    newMembers: 4,
    facilitator: "Elena Papadopoulos"
  },
  {
    id: 12,
    name: "Greek Orthodox Easter Celebration",
    type: "Cultural Celebration",
    community: "Greek",
    suburb: "Hurstville",
    date: "2024-03-31",
    attendance: 89,
    newMembers: 12,
    facilitator: "Nikos Stavros"
  },
  {
    id: 13,
    name: "Greek Poetry Reading Circle",
    type: "Cultural Event",
    community: "Greek",
    suburb: "Kogarah",
    date: "2024-04-08",
    attendance: 37,
    newMembers: 7,
    facilitator: "Maria Kostas"
  },

  // Nepali Community Programs
  {
    id: 14,
    name: "Nepali Language Classes",
    type: "Language Support",
    community: "Nepali",
    suburb: "Hurstville",
    date: "2024-01-20",
    attendance: 28,
    newMembers: 8,
    facilitator: "Sita Gurung"
  },
  {
    id: 15,
    name: "Digital Government Services Workshop (Nepali)",
    type: "Digital Literacy",
    community: "Nepali",
    suburb: "Kogarah",
    date: "2024-02-15",
    attendance: 22,
    newMembers: 5,
    facilitator: "Ram Thapa"
  },
  {
    id: 16,
    name: "Nepali New Year Festival",
    type: "Cultural Celebration",
    community: "Nepali",
    suburb: "Penshurst",
    date: "2024-04-14",
    attendance: 95,
    newMembers: 18,
    facilitator: "Binita Sharma"
  },
  {
    id: 17,
    name: "ESL Job Search Skills (Nepali)",
    type: "ESL Class",
    community: "Nepali",
    suburb: "South Hurstville",
    date: "2024-03-28",
    attendance: 33,
    newMembers: 6,
    facilitator: "Krishna Poudel"
  },

  // Arabic Community Programs
  {
    id: 18,
    name: "Arabic ESL Conversation Group",
    type: "ESL Class",
    community: "Arabic",
    suburb: "Hurstville",
    date: "2024-01-30",
    attendance: 29,
    newMembers: 7,
    facilitator: "Ahmed Hassan"
  },
  {
    id: 19,
    name: "Digital Safety Workshop (Arabic)",
    type: "Digital Literacy",
    community: "Arabic",
    suburb: "Oatley",
    date: "2024-02-20",
    attendance: 21,
    newMembers: 4,
    facilitator: "Fatima Al-Rashid"
  },
  {
    id: 20,
    name: "Ramadan Community Iftar",
    type: "Cultural Celebration",
    community: "Arabic",
    suburb: "Kogarah",
    date: "2024-03-25",
    attendance: 112,
    newMembers: 20,
    facilitator: "Omar Khalil"
  },
  {
    id: 21,
    name: "Arabic Children's Reading Club",
    type: "Language Support",
    community: "Arabic",
    suburb: "Penshurst",
    date: "2024-04-10",
    attendance: 38,
    newMembers: 9,
    facilitator: "Layla Ibrahim"
  }
];

// Community and suburb lists for filtering
export const communities = [
  "All",
  "Chinese",
  "Spanish", 
  "Greek",
  "Nepali",
  "Arabic"
];

export const suburbs = [
  "All",
  "Hurstville",
  "Kogarah", 
  "Penshurst",
  "South Hurstville",
  "Oatley"
];

// Time period options
export const timePeriods = [
  { label: "YTD", value: "ytd" },
  { label: "12 months", value: "12m" },
  { label: "2 years", value: "2y" },
  { label: "5 years", value: "5y" },
  { label: "10 years", value: "10y" }
];

// SLNSW Benchmarks - Complete structure based on SLNSW 2017 report
export const slnswBenchmarks = {
  quantitative: [
    {
      id: "esl-collection",
      category: "ESL Collection Provision",
      description: "Regular ESL classes or conversation groups available",
      target: "Monthly programs",
      actual: "Weekly programs",
      status: "On Track",
      percentage: 100,
      justification: "Exceeding target with weekly ESL programs across all communities"
    },
    {
      id: "lote-collection-minimum",
      category: "LOTE Collection",
      subcategory: "Minimum Items",
      description: "Minimum 500 items in LOTE collections",
      target: "500 items",
      actual: "1,247 items",
      status: "On Track",
      percentage: 100,
      justification: "Collection significantly exceeds minimum requirement",
      tooltip: "Minimum items requirement for adequate LOTE collection"
    },
    {
      id: "lote-collection-proportion",
      category: "LOTE Collection",
      subcategory: "Proportion for Large LGAs",
      description: "5% of total collection in LOTE materials",
      target: "5%",
      actual: "3.8%",
      status: "Needs Attention",
      percentage: 76,
      justification: "Collection below target proportion, needs expansion",
      tooltip: "For LGAs with >50,000 residents"
    },
    {
      id: "lote-collection-significant",
      category: "LOTE Collection",
      subcategory: "Existence for Significant Groups",
      description: "Collections exist for communities >2% of population",
      target: "5 languages",
      actual: "5 languages",
      status: "On Track", 
      percentage: 100,
      justification: "Collections available in Chinese, Arabic, Greek, Spanish, and Nepali",
      tooltip: "Communities representing >2% of local population"
    },
    {
      id: "specialist-staffing",
      category: "Specialist Librarian Staffing",
      description: "Staff with multicultural services expertise",
      target: "1 FTE specialist",
      actual: "0.6 FTE",
      status: "Needs Attention",
      percentage: 60,
      justification: "Need additional specialist staffing to meet target"
    },
    {
      id: "research-frequency",
      category: "Formal Audience Research Frequency",
      description: "Regular community needs assessment",
      target: "Annual surveys",
      actual: "Biennial surveys",
      status: "Needs Attention",
      percentage: 50,
      justification: "Current research frequency below recommended annual target"
    }
  ],
  qualitative: [
    {
      id: "feedback-mechanisms",
      category: "Feedback Mechanisms",
      description: "Systematic collection of community feedback",
      status: "On Track",
      justification: "Digital feedback system with 78% response rate, quarterly analysis conducted",
      evidence: "Post-program surveys, focus groups, suggestion boxes available in multiple languages"
    },
    {
      id: "staff-cultural-competency",
      category: "Staff Cultural Competency Training",
      description: "Regular cultural awareness and competency training for all staff",
      status: "On Track",
      justification: "All staff completed cultural competency training in 2024, specialized CALD services training for key staff",
      evidence: "Training certificates, specialized workshops, ongoing professional development"
    }
  ]
};

// Suggestions map based on SLNSW 2017 report recommendations
// Comprehensive recommendations for each benchmark type
export const suggestionsMap = {
  // ESL Collection and Programs
  "esl-collection": [
    "Continue offering regular ESL conversation groups and classes",
    "Develop specialized ESL programs for different proficiency levels",
    "Partner with local TAFE and education providers for pathway programs",
    "Create ESL resources for family literacy and children's programs",
    "Train staff in ESL teaching methodologies and cultural sensitivity"
  ],

  // LOTE Collection Development
  "lote-collection-minimum": [
    "Maintain collection above minimum standards through regular acquisition",
    "Establish collection development policy for LOTE materials",
    "Create partnerships with publishers and distributors for LOTE resources",
    "Develop donation programs with community organizations",
    "Implement regular collection assessment and weeding procedures"
  ],
  "lote-collection-proportion": [
    "Conduct community demographic analysis to identify priority languages",
    "Develop strategic partnerships with ethnic organizations for collection advice",
    "Allocate increased budget percentage specifically for LOTE materials",
    "Consider digital LOTE resources and e-book platforms to supplement physical collection",
    "Establish community advisory groups for collection development input",
    "Create targeted acquisition plans for underrepresented languages"
  ],
  "lote-collection-significant": [
    "Regularly review census data to identify emerging community language needs",
    "Establish collections for new significant community groups (>2% population)",
    "Create multilingual displays and promotional materials",
    "Develop community consultation processes for collection priorities",
    "Partner with cultural centers and schools for collection development"
  ],

  // Staffing and Professional Development
  "specialist-staffing": [
    "Recruit additional multicultural services librarian (increase to 1.0 FTE)",
    "Provide specialized training for existing staff in CALD service delivery",
    "Develop succession planning for multicultural services expertise",
    "Consider job sharing arrangements or contract positions to increase capacity",
    "Create professional development pathways for multicultural librarianship",
    "Establish mentoring programs with experienced multicultural services staff"
  ],

  // Research and Evaluation
  "research-frequency": [
    "Implement annual community needs surveys in multiple languages",
    "Establish regular focus groups with community leaders and service users",
    "Develop partnerships with community organizations for ongoing feedback collection",
    "Use social media and digital platforms for continuous community consultation",
    "Create systematic data collection processes for program evaluation",
    "Establish benchmarking with other libraries serving diverse communities"
  ],

  // Community Engagement and Partnerships
  "community-engagement": [
    "Develop formal partnership agreements with ethnic community organizations",
    "Establish regular liaison meetings with cultural associations and leaders",
    "Create multicultural advisory committee with rotating community representation",
    "Implement targeted outreach programs to underserved and emerging communities",
    "Develop volunteer programs involving community members",
    "Create cultural competency exchange programs between library and community"
  ],

  // Feedback and Evaluation Systems
  "feedback-mechanisms": [
    "Maintain digital feedback systems with multilingual survey options",
    "Conduct regular participant interviews and focus groups",
    "Implement suggestion boxes with multilingual prompts",
    "Create online feedback portals accessible in community languages",
    "Establish regular community forums for service feedback",
    "Develop systematic complaint and compliment tracking systems"
  ],

  // Staff Cultural Competency
  "staff-cultural-competency": [
    "Continue mandatory annual cultural competency training for all staff",
    "Provide specialized CALD services training for frontline staff",
    "Implement cross-cultural communication workshops",
    "Create cultural awareness programs featuring local community presentations",
    "Establish professional development partnerships with multicultural organizations",
    "Develop internal cultural competency assessment and improvement plans"
  ],

  // Additional SLNSW 2017 Recommendations
  "programming-diversity": [
    "Develop culturally appropriate programming for different age groups",
    "Create intergenerational programs connecting older and younger community members",
    "Implement technology training specifically designed for CALD communities",
    "Establish regular cultural celebration events and heritage months",
    "Develop literacy and numeracy programs in community languages"
  ],
  "accessibility-inclusion": [
    "Ensure all programs are accessible to people with disabilities",
    "Provide interpreter services for programs and consultations",
    "Create sensory-friendly programming options",
    "Develop programs for isolated community members including elderly",
    "Implement home library services for community members with mobility challenges"
  ],
  "promotional-outreach": [
    "Translate all promotional materials into top 5 community languages",
    "Develop partnerships with ethnic media for program promotion",
    "Create multilingual website content and social media presence",
    "Establish presence at community festivals and cultural events",
    "Develop targeted marketing strategies for different cultural groups"
  ],
  "space-facilities": [
    "Create culturally appropriate spaces for community gatherings",
    "Ensure signage is multilingual and culturally sensitive",
    "Develop quiet spaces for prayer and reflection",
    "Create flexible programming spaces for different cultural activities",
    "Establish community garden or outdoor cultural activity spaces"
  ]
};

// Program types for filtering and charts
export const programTypes = [
  "ESL Class",
  "Digital Literacy",
  "Cultural Celebration",
  "Language Support",
  "Cultural Event"
];

// Helper functions for data filtering and calculations

// Enhanced date filtering utility
export const getDateRange = (timePeriod) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  switch (timePeriod) {
    case "ytd":
      return {
        start: new Date(currentYear, 0, 1), // January 1st of current year
        end: now
      };
    case "12m":
      return {
        start: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
        end: now
      };
    case "2y":
      return {
        start: new Date(now.getFullYear() - 2, now.getMonth(), now.getDate()),
        end: now
      };
    case "5y":
      return {
        start: new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()),
        end: now
      };
    case "10y":
      return {
        start: new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()),
        end: now
      };
    default:
      return null;
  }
};

// Enhanced program filtering function
export const getFilteredPrograms = (programs, filters) => {
  if (!programs || !Array.isArray(programs)) {
    console.warn('Invalid programs data provided to getFilteredPrograms');
    return [];
  }

  if (!filters || typeof filters !== 'object') {
    console.warn('Invalid filters provided to getFilteredPrograms');
    return programs;
  }

  return programs.filter(program => {
    // Validate program data
    if (!program || typeof program !== 'object') {
      return false;
    }

    // Filter by community
    if (filters.community && filters.community !== "All") {
      if (!program.community || program.community !== filters.community) {
        return false;
      }
    }
    
    // Filter by suburb
    if (filters.suburb && filters.suburb !== "All") {
      if (!program.suburb || program.suburb !== filters.suburb) {
        return false;
      }
    }
    
    // Special filtering for Chinese community - only show Hurstville and Kogarah
    if (filters.community === "Chinese" || program.community === "Chinese") {
      const allowedSuburbsForChinese = ["Hurstville", "Kogarah"];
      if (!allowedSuburbsForChinese.includes(program.suburb)) {
        return false;
      }
    }
    
    // Filter by time period
    if (filters.timePeriod && filters.timePeriod !== "all") {
      if (!program.date) {
        return false; // Exclude programs without dates
      }

      const programDate = new Date(program.date);
      
      // Validate date
      if (isNaN(programDate.getTime())) {
        console.warn(`Invalid date format for program ${program.id}: ${program.date}`);
        return false;
      }

      const dateRange = getDateRange(filters.timePeriod);
      if (dateRange) {
        if (programDate < dateRange.start || programDate > dateRange.end) {
          return false;
        }
      }
    }
    
    return true;
  });
};

// Additional filtering utilities
export const filterProgramsByType = (programs, programType) => {
  if (!programType || programType === "All") return programs;
  return programs.filter(program => program.type === programType);
};

export const filterProgramsByDateRange = (programs, startDate, endDate) => {
  if (!startDate || !endDate) return programs;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return programs.filter(program => {
    const programDate = new Date(program.date);
    return programDate >= start && programDate <= end;
  });
};

export const filterProgramsByAttendanceRange = (programs, minAttendance, maxAttendance) => {
  return programs.filter(program => {
    const attendance = program.attendance || 0;
    const min = minAttendance !== undefined ? minAttendance : 0;
    const max = maxAttendance !== undefined ? maxAttendance : Infinity;
    return attendance >= min && attendance <= max;
  });
};

export const calculateSummaryStats = (programs) => {
  if (!programs || !Array.isArray(programs)) {
    console.warn('Invalid programs data provided to calculateSummaryStats');
    return {
      totalCALDAttendees: 0,
      newCALDMembers: 0,
      multilingualCollectionLoans: 0,
      staffCulturalTrainingCompletion: 87
    };
  }

  const validPrograms = programs.filter(program => 
    program && 
    typeof program === 'object' && 
    typeof program.attendance === 'number' && 
    typeof program.newMembers === 'number'
  );

  const totalAttendance = validPrograms.reduce((sum, program) => sum + (program.attendance || 0), 0);
  const totalNewMembers = validPrograms.reduce((sum, program) => sum + (program.newMembers || 0), 0);
  
  // Calculate conversion rate
  const conversionRate = totalAttendance > 0 ? Math.round((totalNewMembers / totalAttendance) * 100) : 0;
  
  // Estimate multilingual collection loans based on attendance and community engagement
  const multilingualLoans = Math.floor(totalAttendance * 2.3); // Estimated multiplier
  
  // Mock data for staff training completion (in real app, this would come from HR system)
  const staffTrainingCompletion = 87; // Percentage
  
  return {
    totalCALDAttendees: totalAttendance,
    newCALDMembers: totalNewMembers,
    multilingualCollectionLoans: multilingualLoans,
    staffCulturalTrainingCompletion: staffTrainingCompletion,
    conversionRate: conversionRate,
    totalPrograms: validPrograms.length,
    averageAttendance: validPrograms.length > 0 ? Math.round(totalAttendance / validPrograms.length) : 0
  };
};

export const getAttendanceByProgramType = (programs) => {
  if (!programs || !Array.isArray(programs)) {
    console.warn('Invalid programs data provided to getAttendanceByProgramType');
    return {};
  }

  const typeMap = {};
  const validPrograms = programs.filter(program => 
    program && 
    program.type && 
    typeof program.attendance === 'number'
  );

  validPrograms.forEach(program => {
    const type = program.type;
    const attendance = program.attendance || 0;
    
    if (!typeMap[type]) {
      typeMap[type] = 0;
    }
    typeMap[type] += attendance;
  });
  
  // Return top 5 program types, or all if less than 5
  return Object.entries(typeMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
};

export const getAttendanceByCommunity = (programs) => {
  if (!programs || !Array.isArray(programs)) {
    console.warn('Invalid programs data provided to getAttendanceByCommunity');
    return {};
  }

  const communityMap = {};
  const validPrograms = programs.filter(program => 
    program && 
    program.community && 
    typeof program.attendance === 'number'
  );

  validPrograms.forEach(program => {
    const community = program.community;
    const attendance = program.attendance || 0;
    
    if (!communityMap[community]) {
      communityMap[community] = 0;
    }
    communityMap[community] += attendance;
  });
  
  // Return top 5 communities, or all if less than 5
  return Object.entries(communityMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
};

// Additional analysis functions
export const getAttendanceBySuburb = (programs) => {
  if (!programs || !Array.isArray(programs)) {
    return {};
  }

  const suburbMap = {};
  programs.forEach(program => {
    if (program && program.suburb && typeof program.attendance === 'number') {
      const suburb = program.suburb;
      const attendance = program.attendance || 0;
      
      if (!suburbMap[suburb]) {
        suburbMap[suburb] = 0;
      }
      suburbMap[suburb] += attendance;
    }
  });
  
  return Object.entries(suburbMap)
    .sort(([,a], [,b]) => b - a)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
};

export const getNewMembersByPeriod = (programs) => {
  if (!programs || !Array.isArray(programs)) {
    return {};
  }

  const monthMap = {};
  programs.forEach(program => {
    if (program && program.date && typeof program.newMembers === 'number') {
      const date = new Date(program.date);
      if (!isNaN(date.getTime())) {
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthMap[monthYear]) {
          monthMap[monthYear] = 0;
        }
        monthMap[monthYear] += program.newMembers || 0;
      }
    }
  });
  
  return monthMap;
};

export const getProgramGrowthTrend = (programs) => {
  if (!programs || !Array.isArray(programs)) {
    return { trend: 'stable', percentage: 0 };
  }

  const sortedPrograms = programs
    .filter(p => p && p.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sortedPrograms.length < 2) {
    return { trend: 'stable', percentage: 0 };
  }

  const midPoint = Math.floor(sortedPrograms.length / 2);
  const firstHalf = sortedPrograms.slice(0, midPoint);
  const secondHalf = sortedPrograms.slice(midPoint);

  const firstHalfAvg = firstHalf.reduce((sum, p) => sum + (p.attendance || 0), 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, p) => sum + (p.attendance || 0), 0) / secondHalf.length;

  const percentageChange = firstHalfAvg > 0 ? Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100) : 0;

  let trend = 'stable';
  if (percentageChange > 10) trend = 'growing';
  else if (percentageChange < -10) trend = 'declining';

  return { trend, percentage: Math.abs(percentageChange) };
};

export const calculateBenchmarkHealth = () => {
  const allBenchmarks = [...slnswBenchmarks.quantitative, ...slnswBenchmarks.qualitative];
  const onTrackCount = allBenchmarks.filter(b => b.status === "On Track").length;
  const totalCount = allBenchmarks.length;
  
  const percentage = Math.round((onTrackCount / totalCount) * 100);
  
  let healthMessage = "";
  let healthStatus = "";
  
  if (percentage >= 90) {
    healthMessage = "Excellent! Strong performance across all SLNSW benchmarks.";
    healthStatus = "Excellent";
  } else if (percentage >= 75) {
    healthMessage = "Good progress with room for targeted improvements.";
    healthStatus = "Good";
  } else if (percentage >= 60) {
    healthMessage = "Moderate performance requiring focused attention.";
    healthStatus = "Needs Attention";
  } else {
    healthMessage = "Significant improvements needed across multiple areas.";
    healthStatus = "Critical";
  }
  
  return {
    percentage,
    healthMessage,
    healthStatus,
    onTrackCount,
    totalCount
  };
};

export const getImprovementAreas = () => {
  const allBenchmarks = [...slnswBenchmarks.quantitative, ...slnswBenchmarks.qualitative];
  return allBenchmarks
    .filter(b => b.status === "Needs Attention" || b.status === "Off Track")
    .map(benchmark => ({
      ...benchmark,
      suggestions: suggestionsMap[benchmark.id] || ["Contact multicultural services team for specific recommendations"]
    }));
};

// Testing and validation functions
export const validateFilterResults = (originalPrograms, filteredPrograms, filters) => {
  const results = {
    isValid: true,
    errors: [],
    summary: {
      originalCount: originalPrograms.length,
      filteredCount: filteredPrograms.length,
      filtersApplied: Object.keys(filters).filter(key => 
        filters[key] && filters[key] !== "All" && filters[key] !== "all"
      )
    }
  };

  // Validate that filtered results are a subset of original
  const invalidPrograms = filteredPrograms.filter(filtered => 
    !originalPrograms.some(original => original.id === filtered.id)
  );

  if (invalidPrograms.length > 0) {
    results.isValid = false;
    results.errors.push(`Found ${invalidPrograms.length} programs in filtered results that don't exist in original data`);
  }

  // Validate community filter
  if (filters.community && filters.community !== "All") {
    const wrongCommunity = filteredPrograms.filter(p => p.community !== filters.community);
    if (wrongCommunity.length > 0) {
      results.isValid = false;
      results.errors.push(`Found ${wrongCommunity.length} programs with wrong community in filtered results`);
    }
  }

  // Validate suburb filter
  if (filters.suburb && filters.suburb !== "All") {
    const wrongSuburb = filteredPrograms.filter(p => p.suburb !== filters.suburb);
    if (wrongSuburb.length > 0) {
      results.isValid = false;
      results.errors.push(`Found ${wrongSuburb.length} programs with wrong suburb in filtered results`);
    }
  }

  // Validate time period filter
  if (filters.timePeriod && filters.timePeriod !== "all" && filters.timePeriod !== "ytd") {
    const dateRange = getDateRange(filters.timePeriod);
    if (dateRange) {
      const wrongDates = filteredPrograms.filter(p => {
        const programDate = new Date(p.date);
        return programDate < dateRange.start || programDate > dateRange.end;
      });
      if (wrongDates.length > 0) {
        results.isValid = false;
        results.errors.push(`Found ${wrongDates.length} programs with dates outside the specified range`);
      }
    }
  }

  return results;
};

// Comprehensive filtering function that updates all sections
export const getFilteredDashboardData = (filters) => {
  try {
    // Get filtered programs
    const filteredPrograms = getFilteredPrograms(programData, filters);
    
    // Validate filtering results
    const validation = validateFilterResults(programData, filteredPrograms, filters);
    if (!validation.isValid) {
      console.error('Filter validation failed:', validation.errors);
    }

    // Calculate all derived data
    const summaryStats = calculateSummaryStats(filteredPrograms);
    const attendanceByType = getAttendanceByProgramType(filteredPrograms);
    const attendanceByCommunity = getAttendanceByCommunity(filteredPrograms);
    const attendanceBySuburb = getAttendanceBySuburb(filteredPrograms);
    const newMembersByPeriod = getNewMembersByPeriod(filteredPrograms);
    const growthTrend = getProgramGrowthTrend(filteredPrograms);
    
    // Benchmark health is global (not filtered)
    const benchmarkHealth = calculateBenchmarkHealth();
    const improvementAreas = getImprovementAreas();

    return {
      filteredPrograms,
      summaryStats,
      attendanceByType,
      attendanceByCommunity,
      attendanceBySuburb,
      newMembersByPeriod,
      growthTrend,
      benchmarkHealth,
      improvementAreas,
      validation,
      metadata: {
        lastUpdated: new Date().toISOString(),
        filtersApplied: filters,
        totalOriginalPrograms: programData.length
      }
    };
  } catch (error) {
    console.error('Error in getFilteredDashboardData:', error);
    return {
      filteredPrograms: [],
      summaryStats: calculateSummaryStats([]),
      attendanceByType: {},
      attendanceByCommunity: {},
      attendanceBySuburb: {},
      newMembersByPeriod: {},
      growthTrend: { trend: 'stable', percentage: 0 },
      benchmarkHealth: calculateBenchmarkHealth(),
      improvementAreas: getImprovementAreas(),
      validation: { isValid: false, errors: [error.message], summary: {} },
      metadata: {
        lastUpdated: new Date().toISOString(),
        filtersApplied: filters,
        totalOriginalPrograms: programData.length,
        error: true
      }
    };
  }
};

// Export legacy aliases for backward compatibility
export const quantitativeBenchmarks = slnswBenchmarks.quantitative;
export const qualitativeBenchmarks = slnswBenchmarks.qualitative; 