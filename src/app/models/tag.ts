import { Question } from './question';
import { Branch } from './branch';

export class Tag {
    _id: string;
    question = new Question();
    tags = new Array<Branch>();

}
