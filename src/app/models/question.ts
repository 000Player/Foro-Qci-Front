import { User } from './user';
import { Reply } from './reply';

export class Question {
    _id: string;
    user = new User();
    title: string;
    body: string;
    date: Date;
    open: boolean;
    replys: Reply[] = new Array<Reply>();
}
