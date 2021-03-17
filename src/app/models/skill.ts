import { User } from './user';
import { Branch } from './branch';

export class Skill {
    _id: string;
    user = new User();
    skills = new Array<Branch>();
}
