import { gql } from '@apollo/client';

export const GET_REMIXES = gql`
  query remixes($payload: RemixGetDTO!) {
    remixes(payload: $payload) {
      items {
        authorEmail
        createdDate
        description
        genre
        id
        isStore
        name
        price
        trackLength
        updatedDate
      }
      meta {
        isMy
        maxDate
        minDate
        skip
        take
        total
      }
    }
  }
`;

export const GET_REMIX_BY_ID = gql`
  query getRemixById($payload: RemixIdDTO!) {
    remixById(payload: $payload) {
      authorEmail
      createdDate
      description
      genre
      id
      isStore
      name
      price
      trackLength
      updatedDate
    }
  }
`;
