export type CaseStatus = "Pending" | "Active" | "Under Investigation" | "Prosecution" | "Trial" | "Sentenced" | "Closed" | "Acquitted";

export type CasePriority = "Low" | "Medium" | "High" | "Critical";

export interface CaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  type: string;
  status: CaseStatus;
  priority: CasePriority;
  suspect: string;
  assignedOfficer: string;
  prosecutor?: string;
  judge?: string;
  dateOpened: string;
  lastUpdated: string;
  courtDate?: string;
  location: string;
  description: string;
}

export const cases: CaseRecord[] = [
  {
    id: "1",
    caseNumber: "CRM-2024-001",
    title: "Armed Robbery – First National Bank",
    type: "Robbery",
    status: "Trial",
    priority: "Critical",
    suspect: "Marcus J. Reeves",
    assignedOfficer: "Det. Sarah Collins",
    prosecutor: "ADA Robert Hughes",
    judge: "Hon. Patricia Lawson",
    dateOpened: "2024-01-15",
    lastUpdated: "2024-05-02",
    courtDate: "2024-05-20",
    location: "Downtown District",
    description: "Suspect allegedly robbed First National Bank branch at gunpoint, injuring two security guards.",
  },
  {
    id: "2",
    caseNumber: "CRM-2024-002",
    title: "Homicide – Riverside Park",
    type: "Homicide",
    status: "Under Investigation",
    priority: "Critical",
    suspect: "Unknown",
    assignedOfficer: "Det. James Okafor",
    prosecutor: "DA Linda Martinez",
    dateOpened: "2024-02-03",
    lastUpdated: "2024-05-01",
    location: "Riverside District",
    description: "Victim found deceased in Riverside Park. Suspected foul play. Forensics ongoing.",
  },
  {
    id: "3",
    caseNumber: "CRM-2024-003",
    title: "Drug Trafficking – Port Area",
    type: "Narcotics",
    status: "Prosecution",
    priority: "High",
    suspect: "Carlos 'El Tigre' Mendes",
    assignedOfficer: "Sgt. Angela Thorn",
    prosecutor: "ADA Victor Osei",
    judge: "Hon. Samuel Brooks",
    dateOpened: "2024-01-28",
    lastUpdated: "2024-04-30",
    courtDate: "2024-05-15",
    location: "Harbor District",
    description: "Major drug shipment intercepted at port. 200kg of controlled substances seized.",
  },
  {
    id: "4",
    caseNumber: "CRM-2024-004",
    title: "Cybercrime – Financial Fraud",
    type: "Cybercrime",
    status: "Active",
    priority: "High",
    suspect: "Dmitri Volkov",
    assignedOfficer: "Det. Priya Sharma",
    dateOpened: "2024-03-10",
    lastUpdated: "2024-05-01",
    location: "Tech Quarter",
    description: "Large-scale phishing operation targeting bank customers. Estimated $2M in losses.",
  },
  {
    id: "5",
    caseNumber: "CRM-2024-005",
    title: "Assault & Battery – Central Market",
    type: "Assault",
    status: "Pending",
    priority: "Medium",
    suspect: "Troy D. Williams",
    assignedOfficer: "Officer Ben Nkosi",
    dateOpened: "2024-04-18",
    lastUpdated: "2024-04-20",
    location: "Central Market",
    description: "Suspect involved in altercation resulting in serious bodily harm to victim.",
  },
  {
    id: "6",
    caseNumber: "CRM-2024-006",
    title: "Kidnapping – Westside Suburb",
    type: "Kidnapping",
    status: "Active",
    priority: "Critical",
    suspect: "Group Unknown",
    assignedOfficer: "Det. Maya Johnston",
    dateOpened: "2024-04-25",
    lastUpdated: "2024-05-02",
    location: "Westside Suburb",
    description: "Minor child abducted. Ransom demand received. Tactical unit deployed.",
  },
  {
    id: "7",
    caseNumber: "CRM-2024-007",
    title: "Money Laundering – Shell Companies",
    type: "Financial Crime",
    status: "Trial",
    priority: "High",
    suspect: "Adrian Cross & Associates",
    assignedOfficer: "Det. Frank Adeyemi",
    prosecutor: "ADA Nora Walsh",
    judge: "Hon. William Tanaka",
    dateOpened: "2023-11-12",
    lastUpdated: "2024-04-28",
    courtDate: "2024-05-10",
    location: "Financial District",
    description: "Complex money laundering scheme using shell companies across 12 jurisdictions.",
  },
  {
    id: "8",
    caseNumber: "CRM-2024-008",
    title: "Vehicle Theft Ring – Northside",
    type: "Theft",
    status: "Sentenced",
    priority: "Medium",
    suspect: "Rafael Gomes",
    assignedOfficer: "Sgt. Tina Park",
    prosecutor: "ADA Chris Long",
    judge: "Hon. Diana Reed",
    dateOpened: "2023-09-05",
    lastUpdated: "2024-03-15",
    location: "Northside Industrial",
    description: "Organized vehicle theft ring. 47 vehicles recovered. Suspect sentenced to 8 years.",
  },
  {
    id: "9",
    caseNumber: "CRM-2024-009",
    title: "Arson – Warehouse Complex",
    type: "Arson",
    status: "Prosecution",
    priority: "High",
    suspect: "Derek L. Frost",
    assignedOfficer: "Det. Amara Diallo",
    prosecutor: "DA Linda Martinez",
    dateOpened: "2024-02-20",
    lastUpdated: "2024-04-22",
    location: "East Industrial Zone",
    description: "Deliberate fire set at commercial warehouse. $4M property damage. No casualties.",
  },
  {
    id: "10",
    caseNumber: "CRM-2024-010",
    title: "Domestic Violence – Residential Area",
    type: "Domestic Violence",
    status: "Closed",
    priority: "Low",
    suspect: "Name Withheld",
    assignedOfficer: "Officer Lisa Chen",
    prosecutor: "ADA Robert Hughes",
    judge: "Hon. Patricia Lawson",
    dateOpened: "2024-01-08",
    lastUpdated: "2024-04-10",
    location: "Elmwood Residential",
    description: "Domestic violence case resolved. Protective order issued. Perpetrator completed mandated program.",
  },
  {
    id: "11",
    caseNumber: "CRM-2024-011",
    title: "Terrorism Conspiracy – City Infrastructure",
    type: "Terrorism",
    status: "Active",
    priority: "Critical",
    suspect: "Cell 'Red Dawn' (3 suspects)",
    assignedOfficer: "Special Agent Torres",
    dateOpened: "2024-04-01",
    lastUpdated: "2024-05-02",
    location: "Multiple Locations",
    description: "Credible intelligence on plot to attack city water infrastructure. Joint task force active.",
  },
  {
    id: "12",
    caseNumber: "CRM-2024-012",
    title: "Corruption – Municipal Officials",
    type: "Corruption",
    status: "Under Investigation",
    priority: "High",
    suspect: "Multiple Public Officials",
    assignedOfficer: "Det. Henry Boateng",
    dateOpened: "2024-03-01",
    lastUpdated: "2024-04-30",
    location: "City Hall",
    description: "Whistleblower reports of bribery and contract fraud involving municipal procurement officers.",
  },
];

export const hearings = [
  { id: "H1", caseId: "1", caseNumber: "CRM-2024-001", title: "Armed Robbery – First National Bank", date: "2024-05-20", time: "09:00", courtroom: "Courtroom 3A", judge: "Hon. Patricia Lawson", type: "Trial Hearing", status: "Scheduled" },
  { id: "H2", caseId: "3", caseNumber: "CRM-2024-003", title: "Drug Trafficking – Port Area", date: "2024-05-15", time: "14:00", courtroom: "Courtroom 1B", judge: "Hon. Samuel Brooks", type: "Sentencing", status: "Scheduled" },
  { id: "H3", caseId: "7", caseNumber: "CRM-2024-007", title: "Money Laundering – Shell Companies", date: "2024-05-10", time: "10:30", courtroom: "Courtroom 2C", judge: "Hon. William Tanaka", type: "Preliminary Hearing", status: "Completed" },
  { id: "H4", caseId: "8", caseNumber: "CRM-2024-008", title: "Vehicle Theft Ring – Northside", date: "2024-03-15", time: "11:00", courtroom: "Courtroom 4A", judge: "Hon. Diana Reed", type: "Sentencing", status: "Completed" },
];

export const inmates = [
  { id: "P1", name: "Rafael Gomes", caseNumber: "CRM-2024-008", cell: "B-204", facility: "Central Correctional", admittedDate: "2024-03-20", releaseDate: "2032-03-20", offense: "Vehicle Theft", status: "Serving", riskLevel: "Medium" },
  { id: "P2", name: "Elena Vasquez", caseNumber: "CRM-2023-055", cell: "A-101", facility: "Central Correctional", admittedDate: "2023-08-10", releaseDate: "2026-08-10", offense: "Fraud", status: "Serving", riskLevel: "Low" },
  { id: "P3", name: "Jerome T. Banks", caseNumber: "CRM-2022-033", cell: "C-305", facility: "Maximum Security Wing", admittedDate: "2022-12-01", releaseDate: "2042-12-01", offense: "Homicide", status: "Serving", riskLevel: "High" },
  { id: "P4", name: "Sandra Okeke", caseNumber: "CRM-2023-088", cell: "A-208", facility: "Women's Correctional", admittedDate: "2023-11-15", releaseDate: "2025-11-15", offense: "Drug Possession", status: "Serving", riskLevel: "Low" },
  { id: "P5", name: "Bruce Mahoney", caseNumber: "CRM-2021-019", cell: "D-401", facility: "Maximum Security Wing", admittedDate: "2021-06-22", releaseDate: "2036-06-22", offense: "Armed Robbery", status: "Serving", riskLevel: "Critical" },
];

export const navLinks = [
  { label: "Admin Dashboard", href: "/dashboard/admin", role: "Admin", icon: "shield" },
  { label: "Police Portal", href: "/dashboard/police", role: "Police", icon: "badge" },
  { label: "Investigation", href: "/dashboard/investigation", role: "Investigation", icon: "search" },
  { label: "Prosecutor", href: "/dashboard/prosecutor", role: "Prosecutor", icon: "scale" },
  { label: "Court", href: "/dashboard/court", role: "Court", icon: "gavel" },
  { label: "Judge", href: "/dashboard/judge", role: "Judge", icon: "book" },
  { label: "Prison", href: "/dashboard/prison", role: "Prison", icon: "lock" },
  { label: "Reports", href: "/dashboard/reports", role: "Reports", icon: "chart" },
];

export const demoCredentials = [
  { role: "Admin", username: "admin@inccms.gov", password: "Admin@2024", mfa: "123456" },
  { role: "Police", username: "officer@inccms.gov", password: "Police@2024", mfa: "234567" },
  { role: "Prosecutor", username: "prosecutor@inccms.gov", password: "Prose@2024", mfa: "345678" },
  { role: "Judge", username: "judge@inccms.gov", password: "Judge@2024", mfa: "456789" },
  { role: "Prison Officer", username: "prison@inccms.gov", password: "Prison@2024", mfa: "567890" },
];
