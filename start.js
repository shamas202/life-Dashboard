#!/usr/bin/env node
/**
 * Life Dashboard — Main Entry Point
 * Run: node start.js
 * Starts: Go API (8080) + Python Parser (5000) + React Frontend (5173)
 */

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const ROOT = __dirname;
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
};

function log(prefix, color, msg) {
  console.log(`${color}${colors.bright}[${prefix}]${colors.reset} ${msg}`);
}

function startProcess(name, color, cmd, args, cwd, env = {}) {
  log(name, color, `Starting: ${cmd} ${args.join(" ")}`);
  const proc = spawn(cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });

  proc.stdout.on("data", (d) =>
    d.toString().trim().split("\n").forEach((l) => log(name, color, l))
  );
  proc.stderr.on("data", (d) =>
    d.toString().trim().split("\n").forEach((l) => log(name, color, l))
  );
  proc.on("error", (e) => log(name, colors.red, `Error: ${e.message}`));
  proc.on("exit", (code) => {
    if (code !== 0) log(name, colors.red, `Exited with code ${code}`);
  });
  return proc;
}

async function checkDeps() {
  // Check Go
  const goCheck = spawn("go", ["version"], { shell: true });
  await new Promise((r) => goCheck.on("exit", r));

  // Check Python
  const pyCheck = spawn("python3", ["--version"], { shell: true });
  await new Promise((r) => pyCheck.on("exit", r));

  // Check Node
  log("CHECK", colors.green, `Node.js ${process.version}`);
}

async function installPythonDeps() {
  const reqFile = path.join(ROOT, "python", "requirements.txt");
  if (!fs.existsSync(reqFile)) return;
  log("SETUP", colors.yellow, "Installing Python dependencies...");
  const pip = spawn("pip3", ["install", "-r", "requirements.txt", "-q"], {
    cwd: path.join(ROOT, "python"),
    shell: true,
  });
  await new Promise((r) => pip.on("exit", r));
  log("SETUP", colors.green, "Python deps ready ✓");
}

async function installNodeDeps() {
  const pkgFile = path.join(ROOT, "frontend", "package.json");
  const nmDir = path.join(ROOT, "frontend", "node_modules");
  if (!fs.existsSync(pkgFile)) return;
  if (fs.existsSync(nmDir)) {
    log("SETUP", colors.green, "Node modules already installed ✓");
    return;
  }
  log("SETUP", colors.yellow, "Installing Node.js dependencies (first run)...");
  const npm = spawn("npm", ["install"], {
    cwd: path.join(ROOT, "frontend"),
    shell: true,
    stdio: "inherit",
  });
  await new Promise((r) => npm.on("exit", r));
  log("SETUP", colors.green, "Node deps ready ✓");
}

async function downloadGoModules() {
  log("SETUP", colors.yellow, "Downloading Go modules...");
  const goMod = spawn("go", ["mod", "tidy"], {
    cwd: ROOT,
    shell: true,
    stdio: "inherit",
  });
  await new Promise((r) => goMod.on("exit", r));
  log("SETUP", colors.green, "Go modules ready ✓");
}

async function main() {
  console.log(`
${colors.cyan}${colors.bright}
╔══════════════════════════════════════════╗
║       🗂  LIFE DASHBOARD  v1.0.0         ║
║   Your unified personal command center  ║
╚══════════════════════════════════════════╝
${colors.reset}`);

  await checkDeps();
  await installPythonDeps();
  await installNodeDeps();
  await downloadGoModules();

  console.log("");
  log("START", colors.bright, "Launching all services...\n");

  // 1. Start Go API server
  startProcess(
    "GO API",
    colors.blue,
    "go",
    ["run", "main.go"],
    ROOT
  );

  // 2. Start Python parser
  startProcess(
    "PYTHON",
    colors.magenta,
    "python3",
    ["parser.py"],
    path.join(ROOT, "python")
  );

  // 3. Start React frontend
  startProcess(
    "REACT",
    colors.cyan,
    "npm",
    ["run", "dev"],
    path.join(ROOT, "frontend")
  );

  setTimeout(() => {
    console.log(`
${colors.green}${colors.bright}
✅  All services started!

   🌐 Dashboard  →  http://localhost:5173
   🔌 Go API     →  http://localhost:8080/api/dashboard
   🐍 Parser     →  http://localhost:5000/summary

   Press Ctrl+C to stop all services.
${colors.reset}`);
  }, 4000);

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log(`\n${colors.yellow}Shutting down...${colors.reset}`);
    process.exit(0);
  });
}

main().catch(console.error);
