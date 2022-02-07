export interface Levels{
    level:string;
    fontColor:string;
    bgColor:string;
    borderColor:string;
    id:string;
}

export interface Semesters{
    semester: string;
    fontColor:string;
    bgColor:string;
    borderColor:string;
    id:string;
}

export interface Faculties{
    faculty: string;
    active:boolean;
    order:number;
    id: string
}

export interface Departments {
    department:string;
    faculty:string;
    bgColor:string;
    fontColor:string;
    borderColor:string;
    id:string;
}

export interface Programmes{
    programme:string;
    faculty:string;
    bgColor:string;
    fontColor:string;
    selected:boolean;
    id:string;
}

export interface Courses{
    course:string;
    programmes:string[];
    faculties:string[];
    fontColor:string;
    level:string;
    semester:string;
    image:string;
    views:number;
    id:string;
    files:ProgrammeFiles[];

    liked:boolean;
}

export interface ProgrammeFiles{
    url:string;
    preview:string;
    course:string;
    title:string;
    type:string;
    size:number;
    id:string;
}

export interface FilterCourse{
    programme:string;
    programmes:string[];
    faculties:string[];
    level:string;
    semester:string;
    faculty:string;
}