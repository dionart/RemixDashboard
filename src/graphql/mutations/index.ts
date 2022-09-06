import { gql } from '@apollo/client';

export const DELETE_REMIX = gql`
  mutation deleteRemix($payload: RemixIdDTO!) {
    deleteRemix(payload: $payload)
  }
`;

export const CREATE_REMIX = gql`
  mutation createRemix($payload: RemixCreateDTO!) {
    createRemix(payload: $payload) {
      authorEmail
      description
      genre
      id
      name
      price
      trackLength
      isStore
      createdDate
      updatedDate
    }
  }
`;

export const EDIT_REMIX = gql`
  mutation updateRemix($payload: RemixUpdateDTO!) {
    updateRemix(payload: $payload) {
      authorEmail
      description
      genre
      id
      name
      price
      trackLength
      isStore
      createdDate
      updatedDate
    }
  }
`;
