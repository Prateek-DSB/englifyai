// Hardcoded credentials for authentication
const CREDENTIALS = [
  {username:"abc1",password:"xyz1"},
  {username:"abc2",password:"xyz2"},
  {username:"abc3",password:"xyz3"},
  {username:"abc4",password:"xyz4"},
  {username:"abc5",password:"xyz5"}
];

export interface User {
  username: string;
}

export const validateUser = (user: string, pass: string) => {
  return CREDENTIALS.some(c => c.username === user && c.password === pass);
};

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const username = sessionStorage.getItem('englifyai_user');
  if (username) {
    return { username };
  }
  
  return null;
}

export function setCurrentUser(user: User): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('englifyai_user', user.username);
  }
}

export function clearCurrentUser(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('englifyai_user');
  }
}
