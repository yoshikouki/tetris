"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause } from "lucide-react";
import { GameControlButton } from "./game-control-button";
import { GameControlContainer } from "./game-control-container";
import { useTetris } from "./use-tetris";

export const Tetris = () => {
  const {
    board,
    boardRef,
    startTetris,
    finishTetris,
    pauseTetris,
    resumeTetris,
    readyTetris,
    isActiveTetromino,
    isBelowActiveTetromino,
  } = useTetris();

  return (
    <div className="relative z-10 flex h-svh w-full flex-col items-center justify-center overscroll-none">
      {/* Game Header */}
      <div
        className={cn(
          "flex w-full max-w-xs justify-between pt-4 opacity-100 transition-all duration-200",
          board.status === "ready" && "pointer-events-none opacity-0",
        )}
      >
        <div />
        <div>
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={pauseTetris}
          >
            <Pause className="fill-primary stroke-none" />
          </Button>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="flex h-full w-full flex-col items-center px-4"
        ref={boardRef}
      >
        <div
          className={cn("grid max-h-svh w-full max-w-xs gap-1")}
          style={{
            gridTemplateRows: `repeat(${board.rowsNumber}, 1fr)`,
            gridTemplateColumns: `repeat(${board.colsNumber}, 1fr)`,
          }}
        >
          {board.rows.map((row, rowIndex) =>
            row.cells.map((cell, cellIndex) => (
              <div
                key={cell.id}
                className={cn(
                  "aspect-square rounded-sm bg-primary/5",
                  cell.tetrominoId
                    ? "rounded-none bg-primary"
                    : isActiveTetromino(cellIndex, rowIndex)
                      ? "bg-primary/90"
                      : isBelowActiveTetromino(cellIndex, rowIndex) &&
                        "bg-primary/10",
                )}
              />
            )),
          )}
        </div>
      </div>

      {/* Game Controller */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-background/30 opacity-100 transition-all duration-200",
          board.status === "playing" && "pointer-events-none opacity-0",
        )}
      >
        <GameControlContainer isVisible={board.status === "ready"}>
          <GameControlButton onClick={startTetris}>PLAY</GameControlButton>
        </GameControlContainer>
        <GameControlContainer isVisible={board.status === "pause"}>
          <GameControlButton onClick={resumeTetris}>RESUME</GameControlButton>
          <GameControlButton onClick={finishTetris} variant={"outline"}>
            FINISH
          </GameControlButton>
        </GameControlContainer>
        <GameControlContainer isVisible={board.status === "finished"}>
          <GameControlButton onClick={startTetris}>RESTART</GameControlButton>
          <GameControlButton onClick={readyTetris} variant={"outline"}>
            QUIT
          </GameControlButton>
        </GameControlContainer>
      </div>
    </div>
  );
};
