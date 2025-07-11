-- CreateTable
CREATE TABLE "Summary" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "scrapedText" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);
