export const PERMISSIONS = {
  employee: {
    pages: ["dashboard", "attendance", "leaves", "grievances"],
    actions: {
      leave: ["apply"],
      grievance: ["create"],
    },
    reports: [],
  },

  supervisor: {
    pages: ["dashboard", "attendance", "leaves", "grievances", "reports"],
    actions: {
      leave: ["approve"],
      grievance: ["view"],
    },
    reports: ["attendance", "leave", "grievance"],
  },

  hr: {
    pages: ["dashboard", "employees", "attendance", "leaves", "grievances", "reports"],
    actions: {
      employee: ["create", "edit"],
      leave: ["approve"],
      grievance: ["resolve"],
    },
    reports: ["employee", "attendance", "leave", "grievance"],
  },

  admin: {
    pages: [
      "dashboard",
      "employees",
      "attendance",
      "leaves",
      "grievances",
      "transfers",
      "payroll",
      "reports",
    ],
    actions: {
      employee: ["create", "edit", "delete"],
      attendance: ["create", "edit"],
      leave: ["approve"],
      grievance: ["resolve"],
      transfer: ["approve"],
      payroll: ["generate"],
    },
    reports: ["employee", "attendance", "leave", "payroll", "grievance", "transfer"],
  },
};
