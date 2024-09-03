-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "activityTypeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "idx_24578_PRIMARY" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reimbursement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "Reimbursement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'IconFileDollar',
    "userId" VARCHAR(191) NOT NULL,
    "parentCategoryId" INTEGER,

    CONSTRAINT "idx_24591_PRIMARY" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "idx_24586_PRIMARY" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'IconFileDollar',
    "userId" VARCHAR(191) NOT NULL,
    "activityTypeId" INTEGER NOT NULL,

    CONSTRAINT "idx_24596_PRIMARY" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_24578_Activity_activityTypeId_idx" ON "Activity"("activityTypeId");

-- CreateIndex
CREATE INDEX "idx_24578_Activity_categoryId_idx" ON "Activity"("categoryId");

-- CreateIndex
CREATE INDEX "idx_24578_Activity_paymentMethodId_idx" ON "Activity"("paymentMethodId");

-- CreateIndex
CREATE INDEX "Reimbursement_activityId_idx" ON "Reimbursement"("activityId");

-- CreateIndex
CREATE INDEX "Reimbursement_paymentMethodId_idx" ON "Reimbursement"("paymentMethodId");

-- CreateIndex
CREATE INDEX "idx_24591_Category_parentCategoryId_idx" ON "Category"("parentCategoryId");

-- CreateIndex
CREATE INDEX "idx_24596_PaymentMethod_activityTypeId_idx" ON "PaymentMethod"("activityTypeId");
