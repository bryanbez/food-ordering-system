export type LoginUserInput = {
  email: string;
  password: string;
};

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
};
