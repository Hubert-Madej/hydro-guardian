export const AuthResponsesDescriptions = {
  signUp: {
    success: {
      status: 201,
      description: 'Successfully registered in the system.',
    },
    invalidInvitationCode: {
      status: 400,
      description:
        'The code provided by the user does not match the one assigned to him by the administrator.',
    },
    invitationDoesNotExists: {
      status: 404,
      description:
        'No valid invitation was found for the provided e-mail address.',
    },
    cognitoAuthError: {
      status: '4XX',
      description:
        'An error occurred while the user was logged in by AWS Cognito.',
    },
  },
  signIn: {
    success: {
      status: 201,
      description: 'The user has successfully logged in to the system.',
    },
    cognitoAuthError: {
      status: '4XX',
      description:
        'An error occurred while the user was logged in by AWS Cognito.',
    },
  },
  createInvitation: {
    success: {
      status: 201,
      description:
        'An invitation has been successfully created for the user with the specified email address.',
    },
  },
};
