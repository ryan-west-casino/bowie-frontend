type Command = {
  id: string;
  title: string;
  author: string;
  link: string;
  name: string;
  desc: string;
  content: string;
  created_at: string;
  updated_at: string;
};
type GameBalance = {
    usd: number;
    gbp: number;
    eur: number;
};
type Balance = {
    id: string;
    fa: icon;
    name: string;
    formatted: number;
}