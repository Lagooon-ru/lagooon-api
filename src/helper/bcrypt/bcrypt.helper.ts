import * as bcrypt from 'bcrypt';

const encryptString = (s: string): string => {
  return bcrypt.hashSync(s, bcrypt.genSaltSync(12));
};

const decryptString = (s: string, w: string): boolean => {
  return bcrypt.compareSync(s, w);
};

export { encryptString, decryptString };
