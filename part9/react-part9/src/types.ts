interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartDesc extends CoursePartBase {
    description: string;
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseNormalPart extends CoursePartDesc {
    type: "normal";
}

interface CourseSubmissionPart extends CoursePartDesc {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseReqPart extends CoursePartDesc {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseReqPart;