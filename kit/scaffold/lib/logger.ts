type Level = "debug" | "info" | "warn" | "error";

type LogFields = Record<string, string | number | boolean | undefined>;

const LEVELS: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };

const minLevel: Level = process.env.NODE_ENV === "production" ? "info" : "debug";

function write(level: Level, msg: string, fields?: LogFields) {
  if (LEVELS[level] < LEVELS[minLevel]) return;
  const line = JSON.stringify({
    level,
    msg,
    time: new Date().toISOString(),
    ...fields,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (msg: string, fields?: LogFields) => write("debug", msg, fields),
  info: (msg: string, fields?: LogFields) => write("info", msg, fields),
  warn: (msg: string, fields?: LogFields) => write("warn", msg, fields),
  error: (msg: string, fields?: LogFields) => write("error", msg, fields),
};
