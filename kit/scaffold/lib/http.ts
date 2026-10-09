import { NextResponse } from "next/server";
import { AppError } from "./errors";
import { logger } from "./logger";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function fail(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message, details: error.details } },
      { status: error.status },
    );
  }
  logger.error("unhandled_error", {
    error: error instanceof Error ? error.message : String(error),
  });
  return NextResponse.json(
    { error: { code: "INTERNAL", message: "Error inesperado" } },
    { status: 500 },
  );
}
