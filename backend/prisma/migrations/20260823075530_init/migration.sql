-- CreateEnum
CREATE TYPE "Country" AS ENUM ('India', 'Canada');

-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('Verified', 'Pending', 'Suspended');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Customer', 'BusinessOwner');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Blocked');

-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SuperAdmin', 'Admin', 'Moderator');

-- CreateEnum
CREATE TYPE "AdminStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('Active', 'Pending', 'Rejected');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('New', 'Contacted', 'InDiscussion', 'QuotationSent', 'Won', 'Lost');

-- CreateEnum
CREATE TYPE "RfqStatus" AS ENUM ('Open', 'Quoted', 'Closed');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "businesses" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessType" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "establishedYear" TEXT NOT NULL DEFAULT '',
    "employees" TEXT NOT NULL DEFAULT '',
    "country" "Country" NOT NULL,
    "state" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "postalCode" TEXT NOT NULL DEFAULT '',
    "lat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lng" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "phone" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "logoUrl" TEXT NOT NULL DEFAULT '',
    "coverUrl" TEXT NOT NULL DEFAULT '',
    "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "videoUrl" TEXT NOT NULL DEFAULT '',
    "status" "BusinessStatus" NOT NULL DEFAULT 'Pending',
    "leads" INTEGER NOT NULL DEFAULT 0,
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "country" "Country" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'Active',
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent" TEXT,
    "businesses" INTEGER NOT NULL DEFAULT 0,
    "status" "CategoryStatus" NOT NULL DEFAULT 'Active',

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "country" "Country" NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "businesses" INTEGER NOT NULL DEFAULT 0,
    "status" "CategoryStatus" NOT NULL DEFAULT 'Active',

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'Admin',
    "status" "AdminStatus" NOT NULL DEFAULT 'Active',
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "business" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "business" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priceFrom" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "business" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'New',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rfqs" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "quotes" INTEGER NOT NULL DEFAULT 0,
    "status" "RfqStatus" NOT NULL DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rfqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "business" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businesses_slug_key" ON "businesses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
