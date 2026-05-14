// Runtime Verification Script
console.log("=== PROJECT RUNTIME ANALYSIS ===\n");

const checks = [];

// Check 1: Environment Variables
console.log("1. Checking Environment Variables...");
try {
  require("dotenv").config();
  const required = ["MONGO_URI", "PORT", "JWT_SECRET"];
  const missing = required.filter(v => !process.env[v]);
  if (missing.length > 0) {
    checks.push({ status: "❌ FAIL", check: "Environment Variables", details: `Missing: ${missing.join(", ")}` });
  } else {
    checks.push({ status: "✅ PASS", check: "Environment Variables", details: "All variables present" });
  }
} catch (e) {
  checks.push({ status: "❌ FAIL", check: "Environment Variables", details: e.message });
}

// Check 2: Module Imports
console.log("2. Checking Module Imports...");
try {
  const modules = [
    ["express", require("express")],
    ["mongoose", require("mongoose")],
    ["jsonwebtoken", require("jsonwebtoken")],
    ["bcryptjs", require("bcryptjs")],
    ["cors", require("cors")],
    ["socket.io", require("socket.io")],
    ["axios", require("axios")],
    ["express-validator", require("express-validator")],
    ["dotenv", require("dotenv")]
  ];
  
  const failed = modules.filter(([name, mod]) => !mod).map(([name]) => name);
  if (failed.length > 0) {
    checks.push({ status: "❌ FAIL", check: "Dependencies", details: `Missing: ${failed.join(", ")}` });
  } else {
    checks.push({ status: "✅ PASS", check: "Dependencies", details: "All dependencies installed" });
  }
} catch (e) {
  checks.push({ status: "❌ FAIL", check: "Dependencies", details: e.message });
}

// Check 3: File Exists
console.log("3. Checking Required Files...");
try {
  const fs = require("fs");
  const path = require("path");
  const files = [
    "app.js",
    "server.js",
    "config/db.js",
    ".env",
    "routes/authRoutes.js",
    "routes/projectRoutes.js",
    "routes/taskRoutes.js",
    "controllers/authController.js",
    "controllers/projectController.js",
    "controllers/taskController.js",
    "models/User.js",
    "models/Project.js",
    "models/Task.js",
    "middleware/authMiddleware.js",
    "middleware/errorMiddleware.js",
    "middleware/validationMiddleware.js",
    "sockets/socket.js",
    "services/executionService.js",
    "services/simulationService.js",
    "services/webhookService.js",
    "services/auditService.js",
    "utils/cycleDetection.js"
  ];
  
  const missing = files.filter(f => !fs.existsSync(path.join(__dirname, f)));
  if (missing.length > 0) {
    checks.push({ status: "❌ FAIL", check: "Required Files", details: `Missing: ${missing.join(", ")}` });
  } else {
    checks.push({ status: "✅ PASS", check: "Required Files", details: "All files present" });
  }
} catch (e) {
  checks.push({ status: "❌ FAIL", check: "Required Files", details: e.message });
}

// Check 4: Module Exports
console.log("4. Checking Module Exports...");
try {
  const exports = [
    ["./app", require("./app")],
    ["./config/db", require("./config/db")],
    ["./routes/authRoutes", require("./routes/authRoutes")],
    ["./routes/projectRoutes", require("./routes/projectRoutes")],
    ["./routes/taskRoutes", require("./routes/taskRoutes")],
    ["./middleware/authMiddleware", require("./middleware/authMiddleware")],
    ["./middleware/errorMiddleware", require("./middleware/errorMiddleware")],
    ["./models/User", require("./models/User")],
    ["./models/Project", require("./models/Project")],
    ["./models/Task", require("./models/Task")],
    ["./sockets/socket", require("./sockets/socket")],
    ["./services/executionService", require("./services/executionService")],
    ["./services/simulationService", require("./services/simulationService")],
    ["./services/webhookService", require("./services/webhookService")],
    ["./utils/cycleDetection", require("./utils/cycleDetection")]
  ];
  
  const missing = exports.filter(([name, mod]) => !mod).map(([name]) => name);
  if (missing.length > 0) {
    checks.push({ status: "❌ FAIL", check: "Module Exports", details: `Invalid exports: ${missing.join(", ")}` });
  } else {
    checks.push({ status: "✅ PASS", check: "Module Exports", details: "All modules export correctly" });
  }
} catch (e) {
  checks.push({ status: "❌ FAIL", check: "Module Exports", details: e.message });
}

// Check 5: Function Availability
console.log("5. Checking Function Exports...");
try {
  const authController = require("./controllers/authController");
  const projectController = require("./controllers/projectController");
  const taskController = require("./controllers/taskController");
  
  const functions = [
    ["authController.signup", typeof authController.signup],
    ["authController.login", typeof authController.login],
    ["projectController.createProject", typeof projectController.createProject],
    ["projectController.getProjects", typeof projectController.getProjects],
    ["projectController.generateInvite", typeof projectController.generateInvite],
    ["projectController.joinProject", typeof projectController.joinProject],
    ["projectController.computeExecutionPlan", typeof projectController.computeExecutionPlan],
    ["projectController.simulateProject", typeof projectController.simulateProject],
    ["taskController.createTask", typeof taskController.createTask],
    ["taskController.updateTask", typeof taskController.updateTask],
    ["taskController.getTasks", typeof taskController.getTasks],
    ["taskController.retryTask", typeof taskController.retryTask],
    ["taskController.getTaskHistory", typeof taskController.getTaskHistory]
  ];
  
  const missing = functions.filter(([name, type]) => type !== "function").map(([name]) => name);
  if (missing.length > 0) {
    checks.push({ status: "❌ FAIL", check: "Function Exports", details: `Missing functions: ${missing.join(", ")}` });
  } else {
    checks.push({ status: "✅ PASS", check: "Function Exports", details: "All controller functions present" });
  }
} catch (e) {
  checks.push({ status: "❌ FAIL", check: "Function Exports", details: e.message });
}

// Check 6: Middleware Availability
console.log("6. Checking Middleware...");
try {
  const authMid = require("./middleware/authMiddleware");
  const errorMid = require("./middleware/errorMiddleware");
  const validationMid = require("./middleware/validationMiddleware");
  
  if (typeof authMid !== "function") {
    checks.push({ status: "❌ FAIL", check: "Middleware", details: "authMiddleware not a function" });
  } else if (typeof errorMid !== "function") {
    checks.push({ status: "❌ FAIL", check: "Middleware", details: "errorMiddleware not a function" });
  } else if (typeof validationMid !== "function") {
    checks.push({ status: "❌ FAIL", check: "Middleware", details: "validationMiddleware not a function" });
  } else {
    checks.push({ status: "✅ PASS", check: "Middleware", details: "All middleware functions valid" });
  }
} catch (e) {
  checks.push({ status: "❌ FAIL", check: "Middleware", details: e.message });
}

// Print Results
console.log("\n=== RESULTS ===\n");
checks.forEach(check => {
  console.log(`${check.status} | ${check.check}: ${check.details}`);
});

const passed = checks.filter(c => c.status.includes("PASS")).length;
const total = checks.length;
console.log(`\n✓ Passed: ${passed}/${total}`);

if (passed === total) {
  console.log("\n✅ ALL CHECKS PASSED - Project is ready for runtime!");
  process.exit(0);
} else {
  console.log("\n❌ Some checks failed - See details above");
  process.exit(1);
}
