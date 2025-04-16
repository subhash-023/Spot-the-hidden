-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "obj1Name" TEXT NOT NULL,
    "obj2Name" TEXT NOT NULL,
    "obj3Name" TEXT NOT NULL,
    "obj1X" DOUBLE PRECISION NOT NULL,
    "obj1Y" DOUBLE PRECISION NOT NULL,
    "obj2X" DOUBLE PRECISION NOT NULL,
    "obj2Y" DOUBLE PRECISION NOT NULL,
    "obj3X" DOUBLE PRECISION NOT NULL,
    "obj3Y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_level_key" ON "Level"("level");

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
