/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAction } from "./board-action-parser";
import { isSortable } from "@dnd-kit/react/sortable";

vi.mock("@dnd-kit/react/sortable", () => ({
  isSortable: vi.fn()
}));

describe("getAction parser", () => {
  beforeEach(() => {
    vi.mocked(isSortable).mockReset();
  });

  it("should return null if the operation is canceled", () => {
    const event = {
      operation: { canceled: true, source: {}, target: {} }
    } as any;

    expect(getAction(event)).toBeNull();
  });

  it("should return null if source or target are not sortable", () => {
    vi.mocked(isSortable).mockReturnValue(false);

    const event = {
      operation: { canceled: false, source: {}, target: {} }
    } as any;

    expect(getAction(event)).toBeNull();
  });

  it("should parse REORDER_COLUMN correctly", () => {
    vi.mocked(isSortable).mockReturnValue(true);

    const event = {
      operation: {
        canceled: false,
        source: { type: "column", initialIndex: 0, index: 1 },
        target: { index: 1 }
      }
    } as any;

    const action = getAction(event);

    expect(action).toEqual({
      type: "REORDER_COLUMN",
      from: 0,
      to: 1
    });
  });

  it("should parse MOVE_CARD between different columns correctly", () => {
    vi.mocked(isSortable).mockReturnValue(true);

    const event = {
      operation: {
        canceled: false,
        // Group mismatch means it's moving cross columns
        source: { group: "col-1", id: "card-1", data: { columnId: "col-1" } },
        target: { group: "col-2", id: "card-2", data: { columnId: "col-2" } }
      }
    } as any;

    const action = getAction(event);

    expect(action).toEqual({
      type: "MOVE_CARD",
      fromCol: "col-1",
      toCol: "col-2",
      cardId: "card-1"
    });
  });
});
