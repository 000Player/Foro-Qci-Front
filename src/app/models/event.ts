import { User } from './user'

export class Event {
    _id: string;
    user = new User();
    title: string;
    body: string;
    dateStart: Date;
    dateEnd: Date;
    open: boolean;
}
