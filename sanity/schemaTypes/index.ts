import { type SchemaTypeDefinition } from "sanity";
import { studentType } from "./studentType";
import { courseType } from "./courseType";
import { instructorType } from "./instructorType";
import { moduleType } from "./moduleType";
import { lessonType } from "./lessonType";
import { categoryType } from "./categoryType";
import { blockContent } from "./blockContent";
import { enrollmentType } from "./enrollmentType";
import { lessonCompletionType } from "./lessonCompletionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    studentType,
    courseType,
    instructorType,
    moduleType,
    lessonType,
    categoryType,
    blockContent,
    enrollmentType,
    lessonCompletionType,
  ],
};

export * from "./studentType";
export * from "./courseType";
export * from "./instructorType";
export * from "./moduleType";
export * from "./lessonType";
export * from "./categoryType";
export * from "./enrollmentType";
export * from "./lessonCompletionType";
