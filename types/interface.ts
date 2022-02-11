export interface adminDetails {
    email: string;
    password: string;
    admin: boolean;
    electionDate: string;
}

export interface userDetails  {
    firstname: string;
    lastname: string;
    voterID: string;
    phonenumber: string;
    email: string;
    password: string;
    biometrics: any,
    electionDate: string;

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

export interface candidate {
    position: string;
    party: string;
    candidateID: string
}

export interface usersVote {
    userID: string;
    votes: candidate[]
    electionDate: string;
}

export interface positionDetail{
    position: string;
    maxVote: number;
    _id?: string;
}