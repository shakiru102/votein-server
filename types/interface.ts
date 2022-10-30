export interface adminDetails {
    email: string;
    password: string;
    admin: boolean;
    electionDate: string;
    super: boolean
}

export interface userDetails  {
    firstname: string;
    lastname: string;
    voterID: string;
    phonenumber: string;
    email: string;
    password: string;
    biometrics?: any,
    electionDate: string;
    _id?: any

}

export interface candidateDetails {
    firstname: string;
    lastname: string;
    position: string;
    party: string;
    electionDate: string;
    NIN: string;
    _id?: any

}


export interface usersVote {
    userID: string;
    votes: positionDetail[]
    electionDate: string;
}

export interface positionDetail{
    position: string;
    maxVote: number;
    _id?: string;
    vote?: string | string[];
}