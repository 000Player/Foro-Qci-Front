import { User } from './user';

export class Reply {
    _id: string;
    user = new User();
    date: Date;
    reply: string;
    score: number;

}
