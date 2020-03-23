/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateTeamInput = {
  id?: string | null;
  name: string;
};

export type ModelTeamConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelTeamConditionInput | null> | null;
  or?: Array<ModelTeamConditionInput | null> | null;
  not?: ModelTeamConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateTeamInput = {
  id: string;
  name?: string | null;
};

export type DeleteTeamInput = {
  id?: string | null;
};

export type CreateMemberInput = {
  id?: string | null;
  teamID: string;
  name: string;
  personID: string;
};

export type ModelMemberConditionInput = {
  teamID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  personID?: ModelIDInput | null;
  and?: Array<ModelMemberConditionInput | null> | null;
  or?: Array<ModelMemberConditionInput | null> | null;
  not?: ModelMemberConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum AssignmentType {
  RUFBEREITSCHAFT = "RUFBEREITSCHAFT"
}

export type UpdateMemberInput = {
  id: string;
  teamID?: string | null;
  name?: string | null;
  personID?: string | null;
};

export type DeleteMemberInput = {
  id?: string | null;
};

export type CreateAssignmentInput = {
  id?: string | null;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type ModelAssignmentConditionInput = {
  memberID?: ModelIDInput | null;
  date?: ModelStringInput | null;
  type?: ModelAssignmentTypeInput | null;
  and?: Array<ModelAssignmentConditionInput | null> | null;
  or?: Array<ModelAssignmentConditionInput | null> | null;
  not?: ModelAssignmentConditionInput | null;
};

export type ModelAssignmentTypeInput = {
  eq?: AssignmentType | null;
  ne?: AssignmentType | null;
};

export type UpdateAssignmentInput = {
  id: string;
  memberID?: string | null;
  date?: string | null;
  type?: AssignmentType | null;
};

export type DeleteAssignmentInput = {
  id?: string | null;
};

export type CreatePersonInput = {
  id?: string | null;
  firstname: string;
  lastname: string;
  email: string;
};

export type ModelPersonConditionInput = {
  firstname?: ModelStringInput | null;
  lastname?: ModelStringInput | null;
  email?: ModelStringInput | null;
  and?: Array<ModelPersonConditionInput | null> | null;
  or?: Array<ModelPersonConditionInput | null> | null;
  not?: ModelPersonConditionInput | null;
};

export enum UnavailabilityType {
  VACATION = "VACATION",
  SICKNESS = "SICKNESS"
}

export type UpdatePersonInput = {
  id: string;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
};

export type DeletePersonInput = {
  id?: string | null;
};

export type CreateUnavailabilityInput = {
  id?: string | null;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type ModelUnavailabilityConditionInput = {
  personID?: ModelIDInput | null;
  date?: ModelStringInput | null;
  type?: ModelUnavailabilityTypeInput | null;
  and?: Array<ModelUnavailabilityConditionInput | null> | null;
  or?: Array<ModelUnavailabilityConditionInput | null> | null;
  not?: ModelUnavailabilityConditionInput | null;
};

export type ModelUnavailabilityTypeInput = {
  eq?: UnavailabilityType | null;
  ne?: UnavailabilityType | null;
};

export type UpdateUnavailabilityInput = {
  id: string;
  personID?: string | null;
  date?: string | null;
  type?: UnavailabilityType | null;
};

export type DeleteUnavailabilityInput = {
  id?: string | null;
};

export type ModelTeamFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelTeamFilterInput | null> | null;
  or?: Array<ModelTeamFilterInput | null> | null;
  not?: ModelTeamFilterInput | null;
};

export type ModelMemberFilterInput = {
  id?: ModelIDInput | null;
  teamID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  personID?: ModelIDInput | null;
  and?: Array<ModelMemberFilterInput | null> | null;
  or?: Array<ModelMemberFilterInput | null> | null;
  not?: ModelMemberFilterInput | null;
};

export type ModelAssignmentFilterInput = {
  id?: ModelIDInput | null;
  memberID?: ModelIDInput | null;
  date?: ModelStringInput | null;
  type?: ModelAssignmentTypeInput | null;
  and?: Array<ModelAssignmentFilterInput | null> | null;
  or?: Array<ModelAssignmentFilterInput | null> | null;
  not?: ModelAssignmentFilterInput | null;
};

export type ModelPersonFilterInput = {
  id?: ModelIDInput | null;
  firstname?: ModelStringInput | null;
  lastname?: ModelStringInput | null;
  email?: ModelStringInput | null;
  and?: Array<ModelPersonFilterInput | null> | null;
  or?: Array<ModelPersonFilterInput | null> | null;
  not?: ModelPersonFilterInput | null;
};

export type ModelUnavailabilityFilterInput = {
  id?: ModelIDInput | null;
  personID?: ModelIDInput | null;
  date?: ModelStringInput | null;
  type?: ModelUnavailabilityTypeInput | null;
  and?: Array<ModelUnavailabilityFilterInput | null> | null;
  or?: Array<ModelUnavailabilityFilterInput | null> | null;
  not?: ModelUnavailabilityFilterInput | null;
};

export type CreateTeamMutation = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type UpdateTeamMutation = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type DeleteTeamMutation = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type CreateMemberMutation = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type UpdateMemberMutation = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type DeleteMemberMutation = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type CreateAssignmentMutation = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type UpdateAssignmentMutation = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type DeleteAssignmentMutation = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type CreatePersonMutation = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type UpdatePersonMutation = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type DeletePersonMutation = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type CreateUnavailabilityMutation = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type UpdateUnavailabilityMutation = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type DeleteUnavailabilityMutation = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type GetTeamQuery = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type ListTeamsQuery = {
  __typename: "ModelTeamConnection";
  items: Array<{
    __typename: "Team";
    id: string;
    name: string;
    members: {
      __typename: "ModelMemberConnection";
      nextToken: string | null;
    } | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetMemberQuery = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type ListMembersQuery = {
  __typename: "ModelMemberConnection";
  items: Array<{
    __typename: "Member";
    id: string;
    teamID: string;
    name: string;
    personID: string;
    person: {
      __typename: "Person";
      id: string;
      firstname: string;
      lastname: string;
      email: string;
    };
    assignments: {
      __typename: "ModelAssignmentConnection";
      nextToken: string | null;
    } | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetAssignmentQuery = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type ListAssignmentsQuery = {
  __typename: "ModelAssignmentConnection";
  items: Array<{
    __typename: "Assignment";
    id: string;
    memberID: string;
    date: string;
    type: AssignmentType;
  } | null> | null;
  nextToken: string | null;
};

export type GetPersonQuery = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type ListPersonsQuery = {
  __typename: "ModelPersonConnection";
  items: Array<{
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetUnavailabilityQuery = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type ListUnavailabilitysQuery = {
  __typename: "ModelUnavailabilityConnection";
  items: Array<{
    __typename: "Unavailability";
    id: string;
    personID: string;
    date: string;
    type: UnavailabilityType;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateTeamSubscription = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnUpdateTeamSubscription = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnDeleteTeamSubscription = {
  __typename: "Team";
  id: string;
  name: string;
  members: {
    __typename: "ModelMemberConnection";
    items: Array<{
      __typename: "Member";
      id: string;
      teamID: string;
      name: string;
      personID: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateMemberSubscription = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnUpdateMemberSubscription = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnDeleteMemberSubscription = {
  __typename: "Member";
  id: string;
  teamID: string;
  name: string;
  personID: string;
  person: {
    __typename: "Person";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    unavailabilities: {
      __typename: "ModelUnavailabilityConnection";
      nextToken: string | null;
    } | null;
  };
  assignments: {
    __typename: "ModelAssignmentConnection";
    items: Array<{
      __typename: "Assignment";
      id: string;
      memberID: string;
      date: string;
      type: AssignmentType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateAssignmentSubscription = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type OnUpdateAssignmentSubscription = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type OnDeleteAssignmentSubscription = {
  __typename: "Assignment";
  id: string;
  memberID: string;
  date: string;
  type: AssignmentType;
};

export type OnCreatePersonSubscription = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnUpdatePersonSubscription = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnDeletePersonSubscription = {
  __typename: "Person";
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  unavailabilities: {
    __typename: "ModelUnavailabilityConnection";
    items: Array<{
      __typename: "Unavailability";
      id: string;
      personID: string;
      date: string;
      type: UnavailabilityType;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateUnavailabilitySubscription = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type OnUpdateUnavailabilitySubscription = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

export type OnDeleteUnavailabilitySubscription = {
  __typename: "Unavailability";
  id: string;
  personID: string;
  date: string;
  type: UnavailabilityType;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateTeam(
    input: CreateTeamInput,
    condition?: ModelTeamConditionInput
  ): Promise<CreateTeamMutation> {
    const statement = `mutation CreateTeam($input: CreateTeamInput!, $condition: ModelTeamConditionInput) {
        createTeam(input: $input, condition: $condition) {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTeamMutation>response.data.createTeam;
  }
  async UpdateTeam(
    input: UpdateTeamInput,
    condition?: ModelTeamConditionInput
  ): Promise<UpdateTeamMutation> {
    const statement = `mutation UpdateTeam($input: UpdateTeamInput!, $condition: ModelTeamConditionInput) {
        updateTeam(input: $input, condition: $condition) {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTeamMutation>response.data.updateTeam;
  }
  async DeleteTeam(
    input: DeleteTeamInput,
    condition?: ModelTeamConditionInput
  ): Promise<DeleteTeamMutation> {
    const statement = `mutation DeleteTeam($input: DeleteTeamInput!, $condition: ModelTeamConditionInput) {
        deleteTeam(input: $input, condition: $condition) {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteTeamMutation>response.data.deleteTeam;
  }
  async CreateMember(
    input: CreateMemberInput,
    condition?: ModelMemberConditionInput
  ): Promise<CreateMemberMutation> {
    const statement = `mutation CreateMember($input: CreateMemberInput!, $condition: ModelMemberConditionInput) {
        createMember(input: $input, condition: $condition) {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMemberMutation>response.data.createMember;
  }
  async UpdateMember(
    input: UpdateMemberInput,
    condition?: ModelMemberConditionInput
  ): Promise<UpdateMemberMutation> {
    const statement = `mutation UpdateMember($input: UpdateMemberInput!, $condition: ModelMemberConditionInput) {
        updateMember(input: $input, condition: $condition) {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMemberMutation>response.data.updateMember;
  }
  async DeleteMember(
    input: DeleteMemberInput,
    condition?: ModelMemberConditionInput
  ): Promise<DeleteMemberMutation> {
    const statement = `mutation DeleteMember($input: DeleteMemberInput!, $condition: ModelMemberConditionInput) {
        deleteMember(input: $input, condition: $condition) {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMemberMutation>response.data.deleteMember;
  }
  async CreateAssignment(
    input: CreateAssignmentInput,
    condition?: ModelAssignmentConditionInput
  ): Promise<CreateAssignmentMutation> {
    const statement = `mutation CreateAssignment($input: CreateAssignmentInput!, $condition: ModelAssignmentConditionInput) {
        createAssignment(input: $input, condition: $condition) {
          __typename
          id
          memberID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateAssignmentMutation>response.data.createAssignment;
  }
  async UpdateAssignment(
    input: UpdateAssignmentInput,
    condition?: ModelAssignmentConditionInput
  ): Promise<UpdateAssignmentMutation> {
    const statement = `mutation UpdateAssignment($input: UpdateAssignmentInput!, $condition: ModelAssignmentConditionInput) {
        updateAssignment(input: $input, condition: $condition) {
          __typename
          id
          memberID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateAssignmentMutation>response.data.updateAssignment;
  }
  async DeleteAssignment(
    input: DeleteAssignmentInput,
    condition?: ModelAssignmentConditionInput
  ): Promise<DeleteAssignmentMutation> {
    const statement = `mutation DeleteAssignment($input: DeleteAssignmentInput!, $condition: ModelAssignmentConditionInput) {
        deleteAssignment(input: $input, condition: $condition) {
          __typename
          id
          memberID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteAssignmentMutation>response.data.deleteAssignment;
  }
  async CreatePerson(
    input: CreatePersonInput,
    condition?: ModelPersonConditionInput
  ): Promise<CreatePersonMutation> {
    const statement = `mutation CreatePerson($input: CreatePersonInput!, $condition: ModelPersonConditionInput) {
        createPerson(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePersonMutation>response.data.createPerson;
  }
  async UpdatePerson(
    input: UpdatePersonInput,
    condition?: ModelPersonConditionInput
  ): Promise<UpdatePersonMutation> {
    const statement = `mutation UpdatePerson($input: UpdatePersonInput!, $condition: ModelPersonConditionInput) {
        updatePerson(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePersonMutation>response.data.updatePerson;
  }
  async DeletePerson(
    input: DeletePersonInput,
    condition?: ModelPersonConditionInput
  ): Promise<DeletePersonMutation> {
    const statement = `mutation DeletePerson($input: DeletePersonInput!, $condition: ModelPersonConditionInput) {
        deletePerson(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePersonMutation>response.data.deletePerson;
  }
  async CreateUnavailability(
    input: CreateUnavailabilityInput,
    condition?: ModelUnavailabilityConditionInput
  ): Promise<CreateUnavailabilityMutation> {
    const statement = `mutation CreateUnavailability($input: CreateUnavailabilityInput!, $condition: ModelUnavailabilityConditionInput) {
        createUnavailability(input: $input, condition: $condition) {
          __typename
          id
          personID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUnavailabilityMutation>response.data.createUnavailability;
  }
  async UpdateUnavailability(
    input: UpdateUnavailabilityInput,
    condition?: ModelUnavailabilityConditionInput
  ): Promise<UpdateUnavailabilityMutation> {
    const statement = `mutation UpdateUnavailability($input: UpdateUnavailabilityInput!, $condition: ModelUnavailabilityConditionInput) {
        updateUnavailability(input: $input, condition: $condition) {
          __typename
          id
          personID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUnavailabilityMutation>response.data.updateUnavailability;
  }
  async DeleteUnavailability(
    input: DeleteUnavailabilityInput,
    condition?: ModelUnavailabilityConditionInput
  ): Promise<DeleteUnavailabilityMutation> {
    const statement = `mutation DeleteUnavailability($input: DeleteUnavailabilityInput!, $condition: ModelUnavailabilityConditionInput) {
        deleteUnavailability(input: $input, condition: $condition) {
          __typename
          id
          personID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUnavailabilityMutation>response.data.deleteUnavailability;
  }
  async GetTeam(id: string): Promise<GetTeamQuery> {
    const statement = `query GetTeam($id: ID!) {
        getTeam(id: $id) {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTeamQuery>response.data.getTeam;
  }
  async ListTeams(
    filter?: ModelTeamFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTeamsQuery> {
    const statement = `query ListTeams($filter: ModelTeamFilterInput, $limit: Int, $nextToken: String) {
        listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            members {
              __typename
              nextToken
            }
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTeamsQuery>response.data.listTeams;
  }
  async GetMember(id: string): Promise<GetMemberQuery> {
    const statement = `query GetMember($id: ID!) {
        getMember(id: $id) {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMemberQuery>response.data.getMember;
  }
  async ListMembers(
    filter?: ModelMemberFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMembersQuery> {
    const statement = `query ListMembers($filter: ModelMemberFilterInput, $limit: Int, $nextToken: String) {
        listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            teamID
            name
            personID
            person {
              __typename
              id
              firstname
              lastname
              email
            }
            assignments {
              __typename
              nextToken
            }
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMembersQuery>response.data.listMembers;
  }
  async GetAssignment(id: string): Promise<GetAssignmentQuery> {
    const statement = `query GetAssignment($id: ID!) {
        getAssignment(id: $id) {
          __typename
          id
          memberID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAssignmentQuery>response.data.getAssignment;
  }
  async ListAssignments(
    filter?: ModelAssignmentFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListAssignmentsQuery> {
    const statement = `query ListAssignments($filter: ModelAssignmentFilterInput, $limit: Int, $nextToken: String) {
        listAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            memberID
            date
            type
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListAssignmentsQuery>response.data.listAssignments;
  }
  async GetPerson(id: string): Promise<GetPersonQuery> {
    const statement = `query GetPerson($id: ID!) {
        getPerson(id: $id) {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPersonQuery>response.data.getPerson;
  }
  async ListPersons(
    filter?: ModelPersonFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPersonsQuery> {
    const statement = `query ListPersons($filter: ModelPersonFilterInput, $limit: Int, $nextToken: String) {
        listPersons(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPersonsQuery>response.data.listPersons;
  }
  async GetUnavailability(id: string): Promise<GetUnavailabilityQuery> {
    const statement = `query GetUnavailability($id: ID!) {
        getUnavailability(id: $id) {
          __typename
          id
          personID
          date
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUnavailabilityQuery>response.data.getUnavailability;
  }
  async ListUnavailabilitys(
    filter?: ModelUnavailabilityFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUnavailabilitysQuery> {
    const statement = `query ListUnavailabilitys($filter: ModelUnavailabilityFilterInput, $limit: Int, $nextToken: String) {
        listUnavailabilitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            personID
            date
            type
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUnavailabilitysQuery>response.data.listUnavailabilitys;
  }
  OnCreateTeamListener: Observable<OnCreateTeamSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateTeam {
        onCreateTeam {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreateTeamSubscription>;

  OnUpdateTeamListener: Observable<OnUpdateTeamSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTeam {
        onUpdateTeam {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdateTeamSubscription>;

  OnDeleteTeamListener: Observable<OnDeleteTeamSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTeam {
        onDeleteTeam {
          __typename
          id
          name
          members {
            __typename
            items {
              __typename
              id
              teamID
              name
              personID
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeleteTeamSubscription>;

  OnCreateMemberListener: Observable<OnCreateMemberSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateMember {
        onCreateMember {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreateMemberSubscription>;

  OnUpdateMemberListener: Observable<OnUpdateMemberSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMember {
        onUpdateMember {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdateMemberSubscription>;

  OnDeleteMemberListener: Observable<OnDeleteMemberSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMember {
        onDeleteMember {
          __typename
          id
          teamID
          name
          personID
          person {
            __typename
            id
            firstname
            lastname
            email
            unavailabilities {
              __typename
              nextToken
            }
          }
          assignments {
            __typename
            items {
              __typename
              id
              memberID
              date
              type
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeleteMemberSubscription>;

  OnCreateAssignmentListener: Observable<
    OnCreateAssignmentSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateAssignment {
        onCreateAssignment {
          __typename
          id
          memberID
          date
          type
        }
      }`
    )
  ) as Observable<OnCreateAssignmentSubscription>;

  OnUpdateAssignmentListener: Observable<
    OnUpdateAssignmentSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateAssignment {
        onUpdateAssignment {
          __typename
          id
          memberID
          date
          type
        }
      }`
    )
  ) as Observable<OnUpdateAssignmentSubscription>;

  OnDeleteAssignmentListener: Observable<
    OnDeleteAssignmentSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteAssignment {
        onDeleteAssignment {
          __typename
          id
          memberID
          date
          type
        }
      }`
    )
  ) as Observable<OnDeleteAssignmentSubscription>;

  OnCreatePersonListener: Observable<OnCreatePersonSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreatePerson {
        onCreatePerson {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreatePersonSubscription>;

  OnUpdatePersonListener: Observable<OnUpdatePersonSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePerson {
        onUpdatePerson {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdatePersonSubscription>;

  OnDeletePersonListener: Observable<OnDeletePersonSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeletePerson {
        onDeletePerson {
          __typename
          id
          firstname
          lastname
          email
          unavailabilities {
            __typename
            items {
              __typename
              id
              personID
              date
              type
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeletePersonSubscription>;

  OnCreateUnavailabilityListener: Observable<
    OnCreateUnavailabilitySubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUnavailability {
        onCreateUnavailability {
          __typename
          id
          personID
          date
          type
        }
      }`
    )
  ) as Observable<OnCreateUnavailabilitySubscription>;

  OnUpdateUnavailabilityListener: Observable<
    OnUpdateUnavailabilitySubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUnavailability {
        onUpdateUnavailability {
          __typename
          id
          personID
          date
          type
        }
      }`
    )
  ) as Observable<OnUpdateUnavailabilitySubscription>;

  OnDeleteUnavailabilityListener: Observable<
    OnDeleteUnavailabilitySubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUnavailability {
        onDeleteUnavailability {
          __typename
          id
          personID
          date
          type
        }
      }`
    )
  ) as Observable<OnDeleteUnavailabilitySubscription>;
}
